using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Egis.GenGenLib.Models;
using Egis.GenGenLib.Models.PowerAmc;
using System.IO;

namespace Egis.GenGenLib.IO
{
    public class GeneratorDoctrineEntity : GeneratorBase
    {
        public String Directory { get; set; }
        public String Namespace { get; set; }

        public override string DisplayName
        {
            get
            {
                return "Doctrine : Entity";
            }
        }

        public override void Generate(Revision sourceRevision, Revision targetRevision)
        {
            foreach (DbSchema dbSchema in targetRevision.ResultSchemas)
            {
                foreach (DbTable dbTable in dbSchema.Tables)
                {

                    string fileName = dbTable.Name.ToCamelCase() + ".php";

                    string filePath = Path.Combine(this.Directory, fileName);
                    using (ScriptWriter writer = new ScriptWriter(filePath, "//",true,"    ","{","}"))
                    {
                        writer.WriteLine("<?php");
                        writer.WriteLine("");
                        writer.WriteLine("namespace " + this.Namespace + ";");
                        writer.WriteLine("");
                        writer.WriteLine("use Doctrine\\ORM\\Mapping as ORM;");
                        writer.WriteLine("");
                        writer.WriteLine("use Symfony\\Component\\Validator\\Constraints as Assert;");
                        writer.WriteLine("");
                        writer.WriteLine("/**");
                        writer.WriteLine("* @ORM\\Entity");
                        writer.WriteLine("* @ORM\\Table(name=\"" + dbSchema.Name.ToLower() + "." + dbTable.Name + "\")");
                        writer.WriteLine("*/");
                        writer.WriteLine("class " + dbTable.Name.ToCamelCase());
                        writer.WriteOpen();
                        foreach (DbColumn dbColumn in dbTable.Columns)
                        {
                            writer.WriteLine("/**");
                            if (dbColumn is DbColumnId && dbColumn.Name.ToLower().Equals("id"))
                            {
                                writer.WriteLine("* @ORM\\GeneratedValue(strategy=\"AUTO\")");
                                writer.WriteLine("* @ORM\\Id");
                                writer.WriteLine("* @ORM\\SequenceGenerator(sequenceName=\"" + dbSchema.Name.ToLower() + "." + dbTable.Name.ToLower() + "_id_seq\")");
                            }
                            writer.WriteLine("* @ORM\\Column(" + this.GetColumnDefinition(dbColumn) + ", name=\"" + dbColumn.Name + "\", nullable=" + dbColumn.AllowNull.ToString().ToLower() + ")");
                            writer.WriteLine("*/");
                            writer.WriteLine("protected $" + dbColumn.Name.ToJavaScriptCase() + ";");
                            writer.WriteLine("");
                        }
                        writer.WriteLine("");
                        List<DbConstraintForeign> parentTableFks = (from f in dbSchema.DbConstraintForeigns where f.ChildTableId == dbTable.Id select f).ToList();
                        foreach (DbConstraintForeign parentTableFk in parentTableFks)
                        {
                            DbTable parentTable = (from t in dbSchema.Tables where t.Id == parentTableFk.ParentTableId select t).FirstOrDefault();
                            DbColumn columnChild = (from c in dbTable.Columns where c.Id == parentTableFk.Joins.First().ChildColumnId select c).FirstOrDefault();
                            DbColumn columnParent = (from c in parentTable.Columns where c.Id == parentTableFk.Joins.First().ParentColumnId select c).FirstOrDefault();

                            writer.WriteLine("/**");
                            writer.WriteLine("*  @ORM\\ManyToOne(targetEntity=\"" + parentTable.Name.ToCamelCase() + "\")");
                            writer.WriteLine("*  @ORM\\JoinColumn(name=\"" + columnChild.Name + "\", referencedColumnName=\"" + columnParent.Name + "\")");
                            writer.WriteLine("**/");
                            writer.WriteLine("protected $" + parentTable.Name.ToJavaScriptCase() + ";");
                            writer.WriteLine("");


                        }

                        List<DbConstraintForeign> parentChildFks = (from f in dbSchema.DbConstraintForeigns where f.ParentTableId == dbTable.Id select f).ToList();
                        foreach (DbConstraintForeign parentChildFk in parentChildFks)
                        {
                            DbTable childTable = (from t in dbSchema.Tables where t.Id == parentChildFk.ChildTableId select t).FirstOrDefault();
                            DbColumn columnChild = (from c in childTable.Columns where c.Id == parentChildFk.Joins.First().ChildColumnId select c).FirstOrDefault();
                            DbColumn columnParent = (from c in dbTable.Columns where c.Id == parentChildFk.Joins.First().ParentColumnId select c).FirstOrDefault();

                            writer.WriteLine("/**");
                            writer.WriteLine("*  @ORM\\OneToMany(targetEntity=\"" + childTable.Name.ToCamelCase() + "\", mappedBy=\"" + dbTable.Name.ToJavaScriptCase() + "\")");
                            writer.WriteLine("**/");
                            writer.WriteLine("protected $" + childTable.Name.ToJavaScriptCase() + "s;");
                            writer.WriteLine("");


                        }
                        writer.WriteLine("public function __construct() {");
                        foreach (DbConstraintForeign parentChildFk in parentChildFks)
                        {
                            DbTable childTable = (from t in dbSchema.Tables where t.Id == parentChildFk.ChildTableId select t).FirstOrDefault();
                            writer.WriteLine("$this->" + childTable.Name.ToJavaScriptCase() + "s = new \\Doctrine\\Common\\Collections\\ArrayCollection();");
                        }
                        writer.WriteLine("}");
                        writer.WriteLine("");
                        foreach (DbColumn dbColumn in dbTable.Columns)
                        {
                            writer.WriteLine("public function get" + dbColumn.Name.ToCamelCase() + "()");
                            writer.WriteOpen();
                            writer.WriteLine("return $this->" + dbColumn.Name.ToJavaScriptCase() + ";");
                            writer.WriteClose();
                            writer.WriteLine("");
                            writer.WriteLine("public function set" + dbColumn.Name.ToCamelCase() + "($value)");
                            writer.WriteOpen();
                            writer.WriteLine("$this->" + dbColumn.Name.ToJavaScriptCase() + "= $value;");
                            writer.WriteClose();
                            writer.WriteLine("");
                        }

                        writer.WriteLine("public function getJson($em)");
                        writer.WriteOpen();
                        writer.WriteLine("$json = [];");
                        foreach (DbColumn dbColumn in dbTable.Columns)
                        {
                            if (dbColumn is DbColumnDate || dbColumn is DbColumnDateHeure)
                            {
                                writer.WriteLine("if ($this->get" + dbColumn.Name.ToCamelCase() + "() !== null && $this->get" + dbColumn.Name.ToCamelCase() + "() !== '')");
                                writer.WriteLine("{$json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"] = $this->get" + dbColumn.Name.ToCamelCase() + "()->format('d/m/Y H:i:s');}");
                                writer.WriteLine("else { $json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"] = null;}");
                            }
                            else if (dbColumn is DbColumnFile)
                            {
                                writer.WriteLine("$json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/File/" + dbTable.Name.ToCamelCase() + "/'.$this->getId();");
                            }
                            else
                            {

                                writer.WriteLine("$json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"] = $this->get" + dbColumn.Name.ToCamelCase() + "();");
                            }

                        }


                        writer.WriteLine("return $json;");
                        writer.WriteClose();
                        writer.WriteLine("");


                        writer.WriteLine("public function setJson($json,$em)");
                        writer.WriteOpen();
                        foreach (DbColumn dbColumn in dbTable.Columns)
                        {
                            writer.WriteLine("if (isset($json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"]))");
                            writer.WriteOpen();
                            if (dbColumn is DbColumnDate || dbColumn is DbColumnDateHeure)
                            {
                                writer.WriteLine("if ($json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"] !== null && $json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"] !== '')");
                                writer.WriteLine("{$this->set" + dbColumn.Name.ToCamelCase() + "(\\DateTime::createFromFormat('d/m/Y H:i:s',$json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"]));}");
                                writer.WriteLine("else {$this->set" + dbColumn.Name.ToCamelCase() + "(null);}");
                            }
                            else if (dbColumn is DbColumnFile)
                            { }
                            else
                            { writer.WriteLine("$this->set" + dbColumn.Name.ToCamelCase() + "($json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"]);"); }





                            writer.WriteClose();
                        }
                        foreach (DbConstraintForeign parentTableFk in parentTableFks)
                        {
                            DbTable parentTable = (from t in dbSchema.Tables where t.Id == parentTableFk.ParentTableId select t).FirstOrDefault();
                            DbColumn columnChild = (from c in dbTable.Columns where c.Id == parentTableFk.Joins.First().ChildColumnId select c).FirstOrDefault();
                            DbColumn columnParent = (from c in parentTable.Columns where c.Id == parentTableFk.Joins.First().ParentColumnId select c).FirstOrDefault();
                            writer.WriteLine("$this->" + parentTable.Name.ToJavaScriptCase() + "= $em->find('\\" + this.Namespace + "\\" + parentTable.Name.ToCamelCase() + "', $json[\"" + columnChild.Name.ToJavaScriptCase() + "\"]);");



                        }
                        writer.WriteClose();
                        writer.WriteLine("");

                        foreach (DbConstraintForeign parentTableFk in parentTableFks)
                        {
                            DbTable parentTable = (from t in dbSchema.Tables where t.Id == parentTableFk.ParentTableId select t).FirstOrDefault();
                            writer.WriteLine("public function get" + parentTable.Name.ToCamelCase() + "()");
                            writer.WriteOpen();
                            writer.WriteLine("return $this->" + parentTable.Name.ToJavaScriptCase() + ";");
                            writer.WriteClose();
                        }

                        foreach (DbConstraintForeign parentChildFk in parentChildFks)
                        {
                            DbTable childTable = (from t in dbSchema.Tables where t.Id == parentChildFk.ChildTableId select t).FirstOrDefault();

                            writer.WriteLine("public function get" + childTable.Name.ToCamelCase() + "s()");
                            writer.WriteOpen();
                            writer.WriteLine("return $this->" + childTable.Name.ToJavaScriptCase() + "s;");
                            writer.WriteClose();
                        }
                        writer.WriteClose();
                    }
                }


                foreach (DbView dbView in dbSchema.Views)
                {

                    string fileName = dbView.Name.ToCamelCase() + ".php";

                    string filePath = Path.Combine(this.Directory, fileName);
                    using (ScriptWriter writer = new ScriptWriter(filePath, "//", true, "    ", "{", "}"))
                    {
                        writer.WriteLine("<?php");
                        writer.WriteLine("");
                        writer.WriteLine("namespace " + this.Namespace + ";");
                        writer.WriteLine("");
                        writer.WriteLine("use Doctrine\\ORM\\Mapping as ORM;");
                        writer.WriteLine("");
                        writer.WriteLine("use Symfony\\Component\\Validator\\Constraints as Assert;");
                        writer.WriteLine("");
                        writer.WriteLine("/**");
                        writer.WriteLine("* @ORM\\Entity");
                        writer.WriteLine("* @ORM\\Table(name=\"" + dbSchema.Name.ToLower() + "." + dbView.Name + "\")");
                        writer.WriteLine("*/");
                        writer.WriteLine("class " + dbView.Name.ToCamelCase());
                        writer.WriteOpen();
                        foreach (DbColumn dbColumn in dbView.Columns)
                        {
                            writer.WriteLine("/**");
                            if (dbColumn is DbColumnId && dbColumn.Name.ToLower().Equals("id"))
                            {
                                writer.WriteLine("* @ORM\\GeneratedValue(strategy=\"NONE\")");
                                writer.WriteLine("* @ORM\\Id");
                                //writer.WriteLine("* @ORM\\SequenceGenerator(sequenceName=\"" + dbSchema.Name.ToLower() + "." + dbView.Name.ToLower() + "_id_seq\")");
                            }
                            writer.WriteLine("* @ORM\\Column(" + this.GetColumnDefinition(dbColumn) + ", name=\"" + dbColumn.Name + "\", nullable=" + dbColumn.AllowNull.ToString().ToLower() + ")");
                            writer.WriteLine("*/");
                            writer.WriteLine("protected $" + dbColumn.Name.ToJavaScriptCase() + ";");
                            writer.WriteLine("");
                        }
                        writer.WriteLine("");
                        
                        writer.WriteLine("public function __construct() {");
                       
                        writer.WriteLine("}");
                        writer.WriteLine("");

                        foreach (DbColumn dbColumn in dbView.Columns)
                        {
                            writer.WriteLine("public function get" + dbColumn.Name.ToCamelCase() + "()");
                            writer.WriteOpen();
                            writer.WriteLine("return $this->" + dbColumn.Name.ToJavaScriptCase() + ";");
                            writer.WriteClose();
                            writer.WriteLine("");
                            writer.WriteLine("public function set" + dbColumn.Name.ToCamelCase() + "($value)");
                            writer.WriteOpen();
                            writer.WriteLine("$this->" + dbColumn.Name.ToJavaScriptCase() + "= $value;");
                            writer.WriteClose();
                            writer.WriteLine("");
                        }

                        writer.WriteLine("public function getJson($em)");
                        writer.WriteOpen();
                        writer.WriteLine("$json = [];");
                        foreach (DbColumn dbColumn in dbView.Columns)
                        {
                            if (dbColumn is DbColumnDate || dbColumn is DbColumnDateHeure)
                            {
                                writer.WriteLine("if ($this->get" + dbColumn.Name.ToCamelCase() + "() !== null && $this->get" + dbColumn.Name.ToCamelCase() + "() !== '')");
                                writer.WriteLine("{$json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"] = $this->get" + dbColumn.Name.ToCamelCase() + "()->format('d/m/Y H:i:s');}");
                                writer.WriteLine("else { $json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"] = null;}");
                            }
                            else if (dbColumn is DbColumnFile)
                            {
                                writer.WriteLine("$json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/File/" + dbView .Name.ToCamelCase() + "/'.$this->getId();");
                            }
                            else
                            {

                                writer.WriteLine("$json[\"" + dbColumn.Name.ToJavaScriptCase() + "\"] = $this->get" + dbColumn.Name.ToCamelCase() + "();");
                            }

                        }


                        writer.WriteLine("return $json;");
                        writer.WriteClose();
                        writer.WriteLine("");
                      
                        writer.WriteClose();
                    }
                }
            }
        }

        private string GetColumnDefinition(DbColumn dbColumn)
        {
            if (dbColumn is DbColumnBool)
            {
                return "type=\"boolean\"";
            }
            else if (dbColumn is DbColumnDate)
            {
                return "type=\"datetime\"";
            }
            else if (dbColumn is DbColumnDateHeure)
            {
                return "type=\"datetime\"";
            }
            else if (dbColumn is DbColumnFile)
            {
                return "type=\"blob\"";
            }
            else if (dbColumn is DbColumnGeom)
            {
                return "type=\"string\"";
            }
            else if (dbColumn is DbColumnId)
            {
                return "type=\"integer\"";
            }
            else if (dbColumn is DbColumnImage)
            {
                return "type=\"blob\"";
            }
            else if (dbColumn is DbColumnLongText)
            {
                return "type=\"string\"";
            }
            else if (dbColumn is DbColumnNumeric)
            {

                DbColumnNumeric dbColumnNumeric = dbColumn as DbColumnNumeric;
                if (dbColumnNumeric.Scale > 0)
                { return "type=\"float\""; }
                else
                { return "type=\"integer\""; }
                // return "NUMBER(" + dbColumnNumeric.Precision + "," + dbColumnNumeric.Scale + ")" + notNullString;
            }
            else if (dbColumn is DbColumnPr)
            {
                return "type=\"integer\"";
            }
            else if (dbColumn is DbColumnText)
            {
                DbColumnText dbColumnText = dbColumn as DbColumnText;
                return "type=\"string\"";
            }
            else
            {
                throw new NotImplementedException();
            }
        }
    }
}
