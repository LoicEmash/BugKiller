using Egis.GenGenLib.Models;
using Egis.GenGenLib.Models.PowerAmc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.IO
{
    public class GeneratorExtJsModel : GeneratorBase
    {
        public String Directory { get; set; }
        public String Namespace { get; set; }

        public override string DisplayName
        {
            get {return "ExtJs : Model"; }
        }

        public override void Generate(Revision sourceRevision, Revision targetRevision)
        {
           


            foreach (DbSchema dbSchema in targetRevision.ResultSchemas)
            {
                String fileName = null;
                string filePath = null;


                fileName = dbSchema.Name.ToCamelCase() + "Base.js";
                filePath = Path.Combine(this.Directory, fileName);
                using (ScriptWriter writer = new ScriptWriter(filePath, false))
                {
                    writer.WriteLine("Ext.define('" + this.Namespace + "." + dbSchema.Name.ToCamelCase() + "Base', {");
                    writer.WriteLine("requires : ['Ext.data.Model'],");
                    writer.WriteLine("extend: 'Ext.data.Model',");
                    writer.WriteLine("schema : {namespace : '"+this.Namespace+"'}"); 
                    writer.WriteLine("});");
                }


                fileName = dbSchema.Name.ToCamelCase() + "Repository.js";
                filePath = Path.Combine(this.Directory, fileName);
                using (ScriptWriter writer = new ScriptWriter(filePath, false))
                {
                    writer.WriteLine("Ext.define('" + this.Namespace + "." + dbSchema.Name.ToCamelCase() + "Repository', {");
                    writer.WriteLine("singleton: true,");
                    writer.WriteLine("requires : [");
                    List<String> requires = new List<string>();
                    writer.IdentLevel++;
                    for (int i = 0; i < dbSchema.Tables.Count; i++)
                    {
                        DbTable dbTable = dbSchema.Tables[i];
                        requires.Add("'" + this.Namespace + "." + dbTable.Name.ToCamelCase() + "'");
                       
                    }

                    for (int i = 0; i < dbSchema.Views.Count; i++)
                    {
                        DbView dbView = dbSchema.Views[i];
                        requires.Add("'" + this.Namespace + "." + dbView.Name.ToCamelCase() + "'");
                        

                    }
                    writer.WriteLine("\r\n"+String.Join(",\r\n", requires));
                    writer.IdentLevel--;
                    writer.WriteLine("]");
                    writer.WriteLine("});");
                }
                foreach (DbTable dbTable in dbSchema.Tables)
                {
                    fileName = dbTable.Name.ToCamelCase() + ".js";
                    filePath = Path.Combine(this.Directory, fileName);
                    using (ScriptWriter writer = new ScriptWriter(filePath,false))
                    {

                        writer.WriteLine("Ext.define('" + this.Namespace + "." + dbTable.Name.ToCamelCase() + "', {");

                        writer.WriteLine("extend: '" + this.Namespace + "." + dbSchema.Name.ToCamelCase() + "Base',");                        
                        List<String> requires = new List<string>();
                        requires.Add("'" + this.Namespace + "." + dbSchema.Name.ToCamelCase() + "Base'");
                        requires.Add("'Egis.data.SecureProxy'");
                        for (int i = 0; i < dbTable.Columns.Count; i++)
                        {
                            DbColumn dbColumn = dbTable.Columns[i];
                            DbConstraintForeign fk = (from f in dbSchema.DbConstraintForeigns where (from j in f.Joins select j.ChildColumnId).Contains(dbColumn.Id) select f).FirstOrDefault();
                           
                            if (fk != null)
                            {
                                DbTable parentTable = (from t in dbSchema.Tables where t.Id.Equals(fk.ParentTableId) select t).FirstOrDefault();
                                requires.Add("'"+this.Namespace+"."+parentTable.Name.ToCamelCase ()+"'");
                            }
                        }
                        writer.WriteLine("requires : [" + string.Join(",", requires) + "],");
                        writer.IdentLevel++;
                        writer.WriteLine("proxy: Ext.create('Egis.data.SecureProxy',{ table:'" + dbTable.Name.ToCamelCase() + "'}),");                       
                        writer.WriteLine("fields : [");
                      
                        for (int i = 0; i < dbTable.Columns.Count; i++)
                        {
                            DbColumn dbColumn = dbTable.Columns[i];
                            DbConstraintForeign fk = (from f in dbSchema.DbConstraintForeigns where (from j in f.Joins select j.ChildColumnId).Contains (dbColumn.Id)  select f).FirstOrDefault();
                            string referenceInfo = "";
                            if (fk != null)
                            {
                                DbTable parentTable = (from t in dbSchema.Tables where t.Id.Equals (fk.ParentTableId ) select t).FirstOrDefault ();
                                referenceInfo = ", reference:  '" + parentTable.Name.ToCamelCase() + "'";
                            }
                            string fieldInfo = "{name: '" + dbColumn.Name.ToJavaScriptCase() + "', type: '" + this.GetColumnDefinition(dbColumn) + "', allowNull: " + dbColumn.AllowNull.ToString().ToLower() + "" + referenceInfo + "}";

                            if (dbColumn is DbColumnDate || dbColumn is DbColumnDateHeure)
                            {
                                fieldInfo = "{name: '" + dbColumn.Name.ToJavaScriptCase() + "', type: '" + this.GetColumnDefinition(dbColumn) + "', allowNull: " + dbColumn.AllowNull.ToString().ToLower() + ", dateFormat:'d/m/Y H:i:s'" + referenceInfo + "}";
                            }
                         
                           
                            if (i < (dbTable.Columns.Count - 1))
                            { fieldInfo += ","; }
                            writer.WriteLine(fieldInfo);
                        }

                        writer.IdentLevel--;
                        writer.WriteLine("]");
                  
                        writer.WriteLine("});");
                        
                    }
                }


                foreach (DbView dbView in dbSchema.Views)
                {
                    fileName = dbView.Name.ToCamelCase() + ".js";
                    filePath = Path.Combine(this.Directory, fileName);
                    using (ScriptWriter writer = new ScriptWriter(filePath, false))
                    {

                        writer.WriteLine("Ext.define('" + this.Namespace + "." + dbView.Name.ToCamelCase() + "', {");

                        writer.WriteLine("extend: '" + this.Namespace + "." + dbSchema.Name.ToCamelCase() + "Base',");
                        List<String> requires = new List<string>();
                        requires.Add("'" + this.Namespace + "." + dbSchema.Name.ToCamelCase() + "Base'");
                        requires.Add("'Egis.data.SecureProxy'");
                        for (int i = 0; i < dbView.Columns.Count; i++)
                        {
                            DbColumn dbColumn = dbView.Columns[i];
                            DbConstraintForeign fk = (from f in dbSchema.DbConstraintForeigns where (from j in f.Joins select j.ChildColumnId).Contains(dbColumn.Id) select f).FirstOrDefault();

                            if (fk != null)
                            {
                                DbTable parentTable = (from t in dbSchema.Tables where t.Id.Equals(fk.ParentTableId) select t).FirstOrDefault();
                                requires.Add("'" + this.Namespace + "." + parentTable.Name.ToCamelCase() + "'");
                            }
                        }
                        writer.WriteLine("requires : [" + string.Join(",", requires) + "],");
                        writer.IdentLevel++;
                        writer.WriteLine("proxy: Ext.create('Egis.data.SecureProxy',{ table:'" + dbView.Name.ToCamelCase() + "'}),");
                        writer.WriteLine("fields : [");

                        for (int i = 0; i < dbView.Columns.Count; i++)
                        {
                            DbColumn dbColumn = dbView.Columns[i];
                            DbConstraintForeign fk = (from f in dbSchema.DbConstraintForeigns where (from j in f.Joins select j.ChildColumnId).Contains(dbColumn.Id) select f).FirstOrDefault();
                            string referenceInfo = "";
                            if (fk != null)
                            {
                                DbTable parentTable = (from t in dbSchema.Tables where t.Id.Equals(fk.ParentTableId) select t).FirstOrDefault();
                                referenceInfo = ", reference:  '" + parentTable.Name.ToCamelCase() + "'";
                            }
                            string fieldInfo = "{name: '" + dbColumn.Name.ToJavaScriptCase() + "', type: '" + this.GetColumnDefinition(dbColumn) + "', allowNull: " + dbColumn.AllowNull.ToString().ToLower() + "" + referenceInfo + "}";

                            if (dbColumn is DbColumnDate || dbColumn is DbColumnDateHeure)
                            {
                                fieldInfo = "{name: '" + dbColumn.Name.ToJavaScriptCase() + "', type: '" + this.GetColumnDefinition(dbColumn) + "', allowNull: " + dbColumn.AllowNull.ToString().ToLower() + ", dateFormat:'d/m/Y H:i:s'" + referenceInfo + "}";
                            }


                            if (i < (dbView.Columns.Count - 1))
                            { fieldInfo += ","; }
                            writer.WriteLine(fieldInfo);
                        }

                        writer.IdentLevel--;
                        writer.WriteLine("]");

                        writer.WriteLine("});");

                    }
                }
            }
        }

        private string GetColumnDefinition(DbColumn dbColumn)
        {
           // string notNullString = "";
           // if (!dbColumn.AllowNull)
          //  { notNullString = " NOT NULL"; }

            if (dbColumn is DbColumnBool)
            {
                return "boolean";
            }
            else if (dbColumn is DbColumnDate)
            {
                return "date";
            }
            else if (dbColumn is DbColumnDateHeure)
            {
                return "date";
            }
            else if (dbColumn is DbColumnFile)
            {
                return "string";
            }
            else if (dbColumn is DbColumnGeom)
            {
                return "string";
            }
            else if (dbColumn is DbColumnId)
            {
                return "int";
            }
            else if (dbColumn is DbColumnImage)
            {
                return "string";
            }
            else if (dbColumn is DbColumnLongText)
            {
                return "string";
            }
            else if (dbColumn is DbColumnNumeric)
            {
               
                DbColumnNumeric dbColumnNumeric = dbColumn as DbColumnNumeric;
                if (dbColumnNumeric.Scale > 0)
                { return "number"; }
                else
                { return "int"; }
               // return "NUMBER(" + dbColumnNumeric.Precision + "," + dbColumnNumeric.Scale + ")" + notNullString;
            }
            else if (dbColumn is DbColumnPr)
            {
                return "string";
            }
            else if (dbColumn is DbColumnText)
            {
                DbColumnText dbColumnText = dbColumn as DbColumnText;
                return "string";
            }
            else
            {
                throw new NotImplementedException();
            }
        }
    }
}
