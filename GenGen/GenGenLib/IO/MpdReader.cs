
using Egis.GenGenLib.Models.PowerAmc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Egis.GenGenLib.IO
{
    public class MpdReader
    {
        private XmlDocument _document;
        private DbSchema _schema;

        public DbSchema Schema
        {
            get { return _schema; }
        }
        public MpdReader(string fileName)
        {

            this._schema = null;
            FileStream stream = new FileStream(fileName, FileMode.Open);

            StreamReader reader = new StreamReader(stream,new UTF8Encoding (false));
                
                    string content = reader.ReadToEnd();
                    content = content.Replace("<a:", "<");
                    content = content.Replace("</a:", "</");
                    content = content.Replace("<o:", "<");
                    content = content.Replace("</o:", "</");
                    content = content.Replace("<c:", "<");
                    content = content.Replace("</c:", "</");

                    this._document = new XmlDocument();
                    this._document.LoadXml(content);
                    XmlNode nodeModel = this._document.DocumentElement.SelectSingleNode("RootObject/Children/Model");
                    if (nodeModel != null)
                    {
                        this._schema = new DbSchema();
                        this._schema.DisplayName = nodeModel.SelectSingleNode("Name").InnerText.ToLower();
                        this._schema.Name = nodeModel.SelectSingleNode("Code").InnerText.ToLower();
                      
                        this._schema.Id =  this._schema.Name+"__"+ nodeModel.Attributes["Id"].Value;
                        if (nodeModel.SelectSingleNode("Version") == null)
                        {
                            throw new MpdReaderException("Veuillez spécififier la version dans le MPD");
                        }
                        string version = nodeModel.SelectSingleNode("Version").InnerText.ToLower();
                        
                        String[] versionComponents = version.Split(".".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
                        this._schema.MajorVersion = Int32.Parse(versionComponents[0]);
                        this._schema.MinorVersion = Int32.Parse(versionComponents[1]);
                        this._schema.RevisionVersion = 0;
                        this._schema.IsModule = false;
                        if (nodeModel.SelectSingleNode("Description") != null)
                        {
                            this._schema.IsModule = nodeModel.SelectSingleNode("Description").InnerText.ToLower().Contains("@Module");
                        }
                        
                        if (this._schema.IsModule)
                        {
                            this._schema.ModuleSchemaDeployAll = true;
                            if (nodeModel.SelectSingleNode("Description").InnerText.ToLower().Contains("@Module("))
                            {
                                string moduleInfo = nodeModel.SelectSingleNode("Description").InnerText.ToLower().Substring(nodeModel.SelectSingleNode("Description").InnerText.ToLower().IndexOf("@Module(") + "@Module(".Length);
                                if (moduleInfo.IndexOf(")") != -1)
                                {
                                    moduleInfo = moduleInfo.Substring(0, moduleInfo.IndexOf(")"));
                                    this._schema.ModuleSchemaDeployAll = false;
                                    this._schema.ModuleSchemaDeploy = moduleInfo.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();
                                   
                                }

                            }
                            
                        }
                       
                    }
                    XmlNodeList nodeTables = this._document.DocumentElement.SelectNodes("RootObject/Children/Model/Tables/Table");
                    List<DbTable> tables = new List<DbTable>();
                    foreach (XmlNode nodeTable in nodeTables)
                    {
                        DbTable table = new DbTable();
                        table.Id = this._schema.Name + "__" + nodeTable.Attributes["Id"].Value;
                        table.Name = nodeTable.SelectSingleNode("Code").InnerText.ToLower();
                       
                        table.DisplayName = nodeTable.SelectSingleNode("Name").InnerText.ToLower();
                        List<DbColumn> columns = new List<DbColumn>();

                        XmlNode nodePrimaryKey = nodeTable.SelectSingleNode("PrimaryKey/Key");
                        string pkRefId = null;
                        if (nodePrimaryKey != null)
                        {
                            pkRefId = this._schema.Name + "__" + nodePrimaryKey.Attributes["Ref"].Value;
                        }
                        ///Model/o:RootObject/c:Children/o:Model/c:Tables/o:Table/c:Indexes/o:Index/a:Name
                        ///
                        XmlNodeList nodeUniqueKeys = nodeTable.SelectNodes("Indexes/Index");
                        foreach (XmlNode nodeUniqueKey in nodeUniqueKeys)
                        {
                            bool isUnique = nodeUniqueKey.SelectSingleNode("Unique") != null && nodeUniqueKey.SelectSingleNode("Unique").InnerText.ToLower().Equals("1");
                            if (isUnique)
                            {
                                XmlNode nodeLinkedObject = nodeUniqueKey.SelectSingleNode("LinkedObject/Key");
                                string linkedObjectRefId = null;
                                if (nodeLinkedObject != null)
                                { linkedObjectRefId = this._schema.Name + "__" + nodeLinkedObject.Attributes["Ref"].Value; }
                                string indexId = this._schema.Name + "__" + nodeUniqueKey.Attributes["Id"].Value;
                                if (pkRefId != null && linkedObjectRefId != null && pkRefId.Equals(linkedObjectRefId))
                                {
                                    DbConstraintPrimary pk = new DbConstraintPrimary();
                                    pk.TableId = table.Id;
                                    pk.Id = this._schema.Name + "__" + nodeUniqueKey.Attributes["Id"].Value;
                                    pk.Name = nodeUniqueKey.SelectSingleNode("Code").InnerText.ToLower();
                                     pk.Name = pk.Name; 
                                    pk.DisplayName = "Clé primaire table "+table.DisplayName;

                                    ///Model/o:RootObject/c:Children/o:Model/c:Tables/o:Table/c:Indexes/o:Index/c:IndexColumns/o:IndexColumn/c:Column/o:Column
                                    XmlNodeList nodeUkColumns = nodeUniqueKey.SelectNodes("IndexColumns/IndexColumn/Column/Column");
                                    foreach (XmlNode nodeUkColumn in nodeUkColumns)
                                    {
                                        pk.ColumnIds.Add(this._schema.Name + "__" + nodeUkColumn.Attributes["Ref"].Value);
                                    }
                                    this._schema.DbConstraintPrimaries.Add(pk);
                                }
                                else
                                {
                                    DbConstraintUnique uk = new DbConstraintUnique();
                                    uk.Id = this._schema.Name + "__" + nodeUniqueKey.Attributes["Id"].Value;
                                    uk.Name = nodeUniqueKey.SelectSingleNode("Code").InnerText.ToLower();
                                  
                                
                                    uk.DisplayName = "Clé unique table " + table.DisplayName;
                                    
                                    uk.TableId = table.Id;
                                    ///Model/o:RootObject/c:Children/o:Model/c:Tables/o:Table/c:Indexes/o:Index/c:IndexColumns/o:IndexColumn/c:Column/o:Column
                                    XmlNodeList nodeUkColumns = nodeUniqueKey.SelectNodes("IndexColumns/IndexColumn/Column/Column");
                                    foreach (XmlNode nodeUkColumn in nodeUkColumns)
                                    {
                                        uk.ColumnIds.Add(this._schema.Name + "__" + nodeUkColumn.Attributes["Ref"].Value);
                                    }
                                    this._schema.DbConstraintUniques.Add(uk);
                                }
                            }
                            
                           
                           
                        }
                        XmlNodeList nodeColumns = nodeTable.SelectNodes("Columns/Column");
                        foreach (XmlNode nodeColumn in nodeColumns)
                        {
                            DbColumn column = this.ParseColumn(table.Id,table.Name, nodeColumn);
                            if (column != null)
                            {
                                columns.Add(column);
                            }
                           
                        }
                    
                       foreach (DbColumn column in columns)
                       {
                           table.Columns.Add(column);
                       }
                        tables.Add(table);
                        Console.WriteLine(nodeTable);
                    }
                    tables = (from t in tables orderby t.Name  select t).ToList();
                    foreach (DbTable table in tables)
                    {this._schema.Tables.Add(table);}


                    XmlNodeList nodeViews = this._document.DocumentElement.SelectNodes("RootObject/Children/Model/Views/View");
                    foreach (XmlNode nodeView in nodeViews)
                    {
                        DbView view = new DbView();
                        view.Id = nodeView.Attributes["Id"].Value;
                        view.DisplayName = nodeView.SelectSingleNode("Name").InnerText.ToLower();
                        view.Name = nodeView.SelectSingleNode("Code").InnerText.ToLower();
                        view.Sql = nodeView.SelectSingleNode("View.SQLQuery").InnerText.ToLower();
                        foreach (DbTable dbTable in this._schema.Tables)
                        {
                            view.Sql = view.Sql.Replace(dbTable.Name.ToLower() + "." + dbTable.Name.ToLower() + "__", dbTable.Name.ToLower()+".");
                        }
                        XmlNodeList nodeColumns = nodeView.SelectNodes("Columns/ViewColumn");
                        foreach (XmlNode nodeColumn in nodeColumns)
                        {
                            DbColumn column = this.ParseColumn (view.Id,view.Name,nodeColumn);
                            if (column != null)                            
                            {
                                view.Columns.Add(column);
                            }

                        }
                        this._schema.Views.Add(view);
                    }
                    // /Model/o:RootObject/c:Children/o:Model/c:References/o:Reference
                    XmlNodeList nodeReferences = nodeModel.SelectNodes("References/Reference");
                    foreach (XmlNode nodeReference in nodeReferences)
                    {
                        DbConstraintForeign fk = new DbConstraintForeign();
                        fk.Id = this._schema.Name + "__" + nodeReference.Attributes["Id"].Value;
                        fk.Name = nodeReference.SelectSingleNode("Code").InnerText.ToLower();
                       
                        fk.DisplayName = nodeReference.SelectSingleNode("Name").InnerText.ToLower();
                        fk.ParentTableId = this._schema.Name + "__" + nodeReference.SelectSingleNode("ParentTable/Table").Attributes["Ref"].Value;
                        fk.ChildTableId = this._schema.Name + "__" + nodeReference.SelectSingleNode("ChildTable/Table").Attributes["Ref"].Value;
                        fk.Cardinality = nodeReference.SelectSingleNode("Cardinality").InnerText.ToLower();
                        fk.OnDeleteCascade = nodeReference.SelectSingleNode("DeleteConstraint").InnerText.ToLower().Equals ("1");
                        fk.OnUpdateCascade = nodeReference.SelectSingleNode("UpdateConstraint").InnerText.ToLower().Equals("1");
                        XmlNodeList nodeJoins = nodeReference.SelectNodes("Joins/ReferenceJoin");
                        foreach (XmlNode nodeJoin in nodeJoins)
                        {
                            DbConstraintForeignJoin join = new DbConstraintForeignJoin();
                            join.Id = nodeJoin.Attributes["Id"].Value;
                            if ( nodeJoin.SelectSingleNode("Object2/Column") != null && nodeJoin.SelectSingleNode("Object1/Column") != null && nodeJoin.SelectSingleNode("Object2/Column").Attributes["Ref"] != null && nodeJoin.SelectSingleNode("Object1/Column").Attributes["Ref"] != null)
                            {
                                join.ParentColumnId = this._schema.Name + "__" + nodeJoin.SelectSingleNode("Object1/Column").Attributes["Ref"].Value;
                                join.ChildColumnId = this._schema.Name + "__" + nodeJoin.SelectSingleNode("Object2/Column").Attributes["Ref"].Value;
                                fk.Joins.Add(join);
                            }
                            
                        }
                        if (fk.Joins.Count > 0)
                        { this._schema.DbConstraintForeigns.Add(fk); }
                     
                    }

                    reader.Close();
                XmlNodeList nodeBusinessRules = this._document.DocumentElement.SelectNodes("RootObject/Children/Model/BusinessRules/BusinessRule");

                foreach (XmlNode nodeBusinessRule in nodeBusinessRules)
                {
                    string expression = nodeBusinessRule.SelectSingleNode("ServerExpression").InnerText.ToLower();
                    if (expression.IndexOf("@Enum(") != -1)
                    {
                        DbRuleEnum dbRuleEnum = new DbRuleEnum();
                        expression = expression.Substring(expression.IndexOf("@Enum(")+"@Enum(".Length);
                        expression = expression.Substring(0, expression.IndexOf(")"));
                        String[] enumValueInfos = expression.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
                        foreach (string enumValueInfo in enumValueInfos)
                        {
                            string[] enumValueInfoComponents = enumValueInfo.Split("|".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
                            DbEnumValue dbEnumValue = new DbEnumValue() {Name = enumValueInfoComponents [0],Value = Int32.Parse (enumValueInfoComponents [1]) };
                            dbRuleEnum.Values .Add (dbEnumValue);
                        }
                        dbRuleEnum.Id = nodeBusinessRule.Attributes["Id"].Value;
                        this._schema.Rules.Rules.Add(dbRuleEnum);
                       
                    }
                }
               
            
        }

        private DbColumn ParseColumn(string tableId, string tableName, XmlNode nodeColumn)
        {
            DbColumn dbColumn = null;
            string columnName = nodeColumn.SelectSingleNode("Code").InnerText.ToLower();
            string dataType = nodeColumn.SelectSingleNode("DataType").InnerText.ToLower();



            if (columnName.StartsWith(tableName + "__"))
            { columnName = columnName.Substring((tableName + "__").Length); }


            string displayName = nodeColumn.SelectSingleNode("Name").InnerText.ToLower();
            string id = this._schema.Name + "__" + nodeColumn.Attributes["Id"].Value;
            bool allowNull = true;
            if (nodeColumn.SelectSingleNode("Mandatory") != null && nodeColumn.SelectSingleNode("Mandatory").InnerText.ToLower().Equals("1"))
            {
                allowNull = false;
            }
           
            dataType = dataType.ToUpper();

            if (dataType.StartsWith("VARCHAR2"))
            {
                int maxLentgh = Int32.Parse(dataType.Replace("VARCHAR2", "").Replace("(", "").Replace(")", ""));
                DbColumnText dbColumnText = new DbColumnText();
                dbColumnText.MaxLength = maxLentgh;
                dbColumn = dbColumnText;
            }
            else if (dataType.StartsWith("VARCHAR"))
            {
                int maxLentgh = Int32.Parse(dataType.Replace("VARCHAR", "").Replace("(", "").Replace(")", ""));
                DbColumnText dbColumnText = new DbColumnText();
                dbColumnText.MaxLength = maxLentgh;
                dbColumn = dbColumnText;
            }
            else if (dataType.Equals("TBOOL"))
            {
                DbColumnBool dbColumnBool = new DbColumnBool();
                dbColumn = dbColumnBool;
            }
            else if (dataType.Equals("TDATEHEURE"))
            {
                DbColumnDateHeure dbColumnDate = new DbColumnDateHeure();
                dbColumn = dbColumnDate;
            }
            else if (dataType.Equals("TDATE"))
            {
                DbColumnDate dbColumnDate = new DbColumnDate();
                dbColumn = dbColumnDate;
            }

            else if (dataType.Equals("TID"))
            {
                DbColumnId dbColumnId = new DbColumnId();
                dbColumn = dbColumnId;

            }

            else if (dataType.Equals("TTEXT"))
            {
                DbColumnLongText dbColumnLongText = new DbColumnLongText();
                dbColumn = dbColumnLongText;
            }
            else if (dataType.StartsWith("NUMERIC"))
            {
                DbColumnNumeric dbColumnNumeric = new DbColumnNumeric();
                string configDataType = dataType.Replace("NUMERIC", "").Replace("(", "").Replace(")", "");
                if (configDataType.IndexOf(",") != -1)
                {
                    string[] configDataTypeComponents = configDataType.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
                    dbColumnNumeric.Precision = Int32.Parse(configDataTypeComponents[0]);
                    dbColumnNumeric.Scale = Int32.Parse(configDataTypeComponents[1]);

                }
                else
                {
                    dbColumnNumeric.Precision = Int32.Parse(configDataType);
                    dbColumnNumeric.Scale = 0;
                }
                dbColumn = dbColumnNumeric;

            }
            else if (dataType.StartsWith("DECIMAL"))
            {
                DbColumnNumeric dbColumnNumeric = new DbColumnNumeric();
                string configDataType = dataType.Replace("DECIMAL", "").Replace("(", "").Replace(")", "");
                if (configDataType.IndexOf(",") != -1)
                {
                    string[] configDataTypeComponents = configDataType.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
                    dbColumnNumeric.Precision = Int32.Parse(configDataTypeComponents[0]);
                    dbColumnNumeric.Scale = Int32.Parse(configDataTypeComponents[1]);

                }
                else
                {
                    dbColumnNumeric.Precision = Int32.Parse(configDataType);
                    dbColumnNumeric.Scale = 0;
                }
                dbColumn = dbColumnNumeric;

            }
            else if (dataType.StartsWith("NUMBER"))
            {
                DbColumnNumeric dbColumnNumeric = new DbColumnNumeric();
                string configDataType = dataType.Replace("NUMBER", "").Replace("(", "").Replace(")", "");
                if (configDataType.IndexOf(",") != -1)
                {
                    string[] configDataTypeComponents = configDataType.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
                    dbColumnNumeric.Precision = Int32.Parse(configDataTypeComponents[0]);
                    dbColumnNumeric.Scale = Int32.Parse(configDataTypeComponents[1]);

                }
                else
                {
                    dbColumnNumeric.Precision = Int32.Parse(configDataType);
                    dbColumnNumeric.Scale = 0;
                }
                dbColumn = dbColumnNumeric;

            }
            else if (dataType.Equals("TPR"))
            {
                DbColumnPr dbColumnPr = new DbColumnPr();
                dbColumn = dbColumnPr;
            }
            else if (dataType.Equals("TGEOM"))
            {
                DbColumnGeom dbColumnVBin = new DbColumnGeom();
                dbColumn = dbColumnVBin;
            }
            else if (dataType.Equals("TIMG"))
            {
                DbColumnImage dbColumnVBin = new DbColumnImage();
                dbColumn = dbColumnVBin;
            }
            else if (dataType.Equals("TFILE"))
            {
                DbColumnFile dbColumnVBin = new DbColumnFile();
                dbColumn = dbColumnVBin;
            }
            if (dbColumn != null)
            {
                XmlNodeList nodeAttachedRuleIds = nodeColumn.SelectNodes("AttachedRules/BusinessRule");
                foreach (XmlNode nodeAttachedRuleId in nodeAttachedRuleIds)
                {
                    dbColumn.AttachedRuleIds.Add(nodeAttachedRuleId.Attributes["Ref"].Value);
                }
                dbColumn.Id = id;
                dbColumn.AllowNull = allowNull;
                dbColumn.TableId = tableId;
                dbColumn.Name = columnName;
                dbColumn.DisplayName = displayName;
                
            }
            else
            {
                Console.WriteLine(dataType + " non implémenté");
                throw new MpdReaderException("Le type " + dataType + " de la colonne " + columnName + " de la table " +tableName+ " n'est pas implémenté dans le parser PowerAmc");


            }
            return dbColumn;
        }
    }
}
