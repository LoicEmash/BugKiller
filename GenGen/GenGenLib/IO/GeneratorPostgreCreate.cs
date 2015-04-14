
using Egis.GenGenLib.IO;
using Egis.GenGenLib.Models;
using Egis.GenGenLib.Models.PowerAmc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.IO
{
    public class GeneratorPostgreCreate : GeneratorDb
    {
      

        public override  string DisplayName
        {
            get { return "Posgtre : Création"; }
        }
        public override void GenerateView(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateView(writer, sourceRevision, targetRevision);
              foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
              {
                  foreach (DbView view in targetSchema.Views)
                  {
                      writer.WriteComment("Création de la vue " + view.Name);
                      writer.WriteLine("create or replace view "+targetSchema.Name+"."+view.Name+" as "+view.Sql+";");
                  }
              }
   
        }
        public override void GenerateComment(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateComment(writer, sourceRevision, targetRevision);
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {
                foreach (DbTable targetTable in targetSchema.Tables)
                {
                    writer.WriteLine("COMMENT ON TABLE " + targetSchema.Name + "." + targetTable.Name + " IS '" + targetTable.DisplayName.Replace("'", "''") + "';");
                    foreach (DbColumn dbColumn in targetTable.Columns)
                    {
                        writer.WriteLine("COMMENT ON COLUMN " + targetSchema.Name + "." + targetTable.Name + "." + dbColumn.Name + " IS '" + dbColumn.DisplayName.Replace("'", "''") + "';");

                    }
                }


            }

        }
        public override void GenerateUser(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateUser(writer, sourceRevision, targetRevision);
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {
                
                    writer.WriteComment("Création des utilisateurs du schéma " + targetSchema.Name);
                    writer.WriteLine("CREATE USER " + targetSchema.Name + "_user_consult WITH LOGIN PASSWORD '" + targetSchema.Name + "_user_consult';");
                    writer.WriteLine("CREATE USER " + targetSchema.Name + "_user_admin WITH LOGIN PASSWORD '" + targetSchema.Name + "_user_admin';");
                

            }
            writer.WriteLine("");
        }

        public override void GenerateRole(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateRole(writer, sourceRevision, targetRevision);
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {
               
                    writer.WriteComment("Création des roles du schéma " + targetSchema.Name);
                    writer.WriteLine("CREATE ROLE " + targetSchema.Name + "_role_consult;");
                    writer.WriteLine("CREATE ROLE " + targetSchema.Name + "_role_admin;");
                
            }
            writer.WriteLine("");

        }

        public override void GenerateSchema(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateSchema(writer, sourceRevision, targetRevision);
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {
                
                    writer.WriteComment("Création du schéma " + targetSchema.Name);
                    writer.WriteLine("CREATE SCHEMA " + targetSchema.Name + ";");
                    writer.WriteLine("CREATE USER " + targetSchema.Name + " WITH LOGIN PASSWORD '" + targetSchema.Name + "';");
                
            }
            writer.WriteLine("");
        }

        public override void GenerateTable(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {


                foreach (DbTable targetTable in targetSchema.Tables)
                {
                    writer.WriteComment("Création de la table " + targetTable.Name);
                    writer.WriteLine("CREATE TABLE " + targetSchema.Name + "." + targetTable.Name + " (");
                    writer.IdentLevel++;
                    for (int columnIndex = 0; columnIndex < targetTable.Columns.Count; columnIndex++)
                    {
                        if (columnIndex < (targetTable.Columns.Count - 1))
                        { writer.WriteLine(targetTable.Columns[columnIndex].Name + " " + this.GetColumnDefinition(targetTable.Columns[columnIndex]) + ","); }
                        else
                        { writer.WriteLine(targetTable.Columns[columnIndex].Name + " " + this.GetColumnDefinition(targetTable.Columns[columnIndex]) + ""); }
                    }
                    writer.IdentLevel--;
                    writer.WriteLine(");");
                    writer.WriteLine("");
                }
            }

        }
        public override void GenerateGrant(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateGrant(writer, sourceRevision, targetRevision);
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {
                foreach (DbSchema targetSchemaIter in targetRevision.ResultSchemas)
                {
                    writer.WriteComment("Droit utilisation du schéma " + targetSchema.Name );                       
                    writer.WriteLine("GRANT USAGE ON SCHEMA " + targetSchemaIter.Name + " TO " + targetSchema.Name + ";");
                    writer.WriteLine("GRANT USAGE ON SCHEMA " + targetSchemaIter.Name + " TO " + targetSchema.Name + "_role_consult;");
                    writer.WriteLine("GRANT USAGE ON SCHEMA " + targetSchemaIter.Name + " TO " + targetSchema.Name + "_role_admin;");
                    writer.WriteLine("");
                    foreach (DbTable targetTableIter in targetSchemaIter.Tables)
                    {
                        
                            writer.WriteComment("Droit en lecture des utilisateurs du schéma " + targetSchema.Name + " sur la table " + targetTableIter.Name + " du schéma " + targetSchemaIter.Name);
                            writer.WriteLine("GRANT SELECT ON " + targetSchemaIter.Name + "." + targetTableIter.Name + " TO " + targetSchema.Name + "_role_consult;");
                            writer.WriteLine("GRANT USAGE, SELECT  ON SEQUENCE " + targetSchemaIter.Name + "." + targetTableIter.Name + "_id_seq TO " + targetSchema.Name + "_role_consult;");
                            writer.WriteLine("");
                        
                       
                    }
                    foreach (DbView targetTableView in targetSchemaIter.Views)
                    {
                        writer.WriteLine("GRANT SELECT ON " + targetSchemaIter.Name + "." + targetTableView.Name + " TO " + targetSchema.Name + "_role_consult;");
                    }
                }

                foreach (DbSchema targetSchemaIter in targetRevision.ResultSchemas)
                {
                    foreach (DbTable targetTableIter in targetSchemaIter.Tables)
                    {
                        if (targetSchemaIter.Name.Equals(targetSchema.Name))
                        {
                            writer.WriteComment("Droit en écriture des utilisateurs du schéma " + targetSchema.Name + " sur la table " + targetTableIter.Name + " du schéma " + targetSchemaIter.Name);
                            writer.WriteLine("GRANT INSERT,UPDATE,SELECT ON " + targetSchemaIter.Name + "." + targetTableIter.Name + " TO " + targetSchema.Name + "_role_admin;");
                            writer.WriteLine("");
                        }
                    }
                }
             
                writer.WriteComment("Attribution des roles au comptes de connexion");
                writer.WriteLine("GRANT " + targetSchema.Name + "_role_consult TO " + targetSchema.Name + "_role_admin;");
                writer.WriteLine("GRANT " + targetSchema.Name + "_role_consult TO " + targetSchema.Name + "_user_consult;");
                writer.WriteLine("GRANT " + targetSchema.Name + "_role_admin TO " + targetSchema.Name + "_user_admin;");
                writer.WriteLine("");

               
            }
        }
        
        

        public override void GeneratePk(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GeneratePk(writer, sourceRevision, targetRevision);

            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {

                foreach (DbConstraintPrimary targetPk in targetSchema.DbConstraintPrimaries)
                {
                    DbTable targetTable = (from t in targetSchema.Tables where t.Id.Equals(targetPk.TableId) select t).FirstOrDefault();
                    writer.WriteComment("Création de la contrainte " + targetPk.Name + " de la table " + targetTable.Name);
                    writer.WriteLine("ALTER TABLE " + targetSchema.Name + "." + targetTable.Name + " ADD CONSTRAINT " + targetPk.Name + " PRIMARY KEY (" + String.Join(",", (from c in targetTable.Columns where targetPk.ColumnIds.Contains(c.Id) select c.Name).ToList()) + ");");
                    writer.WriteLine("");

                }
            }

        }

        public override void GenerateUk(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateUk(writer, sourceRevision, targetRevision);
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {

                foreach (DbConstraintUnique targetUk in targetSchema.DbConstraintUniques)
                {
                    DbTable targetTable = (from t in targetSchema.Tables where t.Id.Equals(targetUk.TableId) select t).FirstOrDefault();
                    writer.WriteComment("Création de la contrainte " + targetUk.Name + " de la table " + targetTable.Name);
                    writer.WriteLine("ALTER TABLE " + targetSchema.Name + "." + targetTable.Name + " ADD CONSTRAINT " + targetUk.Name + " UNIQUE  (" + String.Join(",", (from c in targetTable.Columns where targetUk.ColumnIds.Contains(c.Id) select c.Name).ToList()) + ");");
                    writer.WriteLine("");
                }
            }

        }

        public override void GenerateFk(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateFk(writer, sourceRevision, targetRevision);
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {
                DbSchema sourceSchema = (from s in sourceRevision.ResultSchemas where s.Name.Equals(targetSchema.Name) select s).FirstOrDefault();
                foreach (DbConstraintForeign targetFk in targetSchema.DbConstraintForeigns)
                {
                    DbTable targetTableForeign = (from t in targetSchema.Tables where t.Id.Equals(targetFk.ChildTableId) select t).FirstOrDefault();
                    DbTable targetTableParent = (from t in targetSchema.Tables where t.Id.Equals(targetFk.ParentTableId) select t).FirstOrDefault();
                    writer.WriteComment("Création de la contrainte " + targetFk.Name + " de la table " + targetTableForeign.Name + " qui référence la table " + targetTableParent.Name);
                    writer.WriteLine("ALTER TABLE " + targetSchema.Name + "." + targetTableForeign.Name + " ADD CONSTRAINT " + targetFk.Name + " FOREIGN KEY   (" + String.Join(",", (from c in targetTableForeign.Columns where (from j in targetFk.Joins select j.ChildColumnId).Contains(c.Id) select c.Name).ToList()) + ") REFERENCES " + targetSchema.Name + "." + targetTableParent.Name + " (" + String.Join(",", (from c in targetTableParent.Columns where (from j in targetFk.Joins select j.ParentColumnId).Contains(c.Id) select c.Name).ToList()) + ")  ON DELETE CASCADE;");
                    writer.WriteLine("");
                }
            }

        }

        private string GetColumnDefinition(DbColumn dbColumn)
        {
            string notNullString = "";
            if (!dbColumn.AllowNull)
            { notNullString = " NOT NULL"; }

            if (dbColumn is DbColumnBool)
            {
                return "BOOLEAN" + notNullString;
            }
            else if (dbColumn is DbColumnDate)
            {
                return "DATE" + notNullString;
            }
            else if (dbColumn is DbColumnDateHeure)
            {
                return "TIMESTAMP" + notNullString;
            }
            else if (dbColumn is DbColumnFile)
            {
                return "BYTEA" + notNullString;
            }
            else if (dbColumn is DbColumnGeom)
            {
                return "TEXT" + notNullString;
            }
            else if (dbColumn is DbColumnId)
            {
                if (dbColumn.Name.ToLower().EndsWith("__id"))
                { return "INTEGER" + notNullString; }
                else 
                { return "SERIAL" + notNullString; }
            }
            else if (dbColumn is DbColumnImage)
            {
                return "BYTEA" + notNullString;
            }
            else if (dbColumn is DbColumnLongText)
            {
                return "TEXT" + notNullString;
            }
            else if (dbColumn is DbColumnNumeric)
            {
                if (dbColumn.Name.ToLower().EndsWith("_id"))
                {
                    return "INTEGER" + notNullString;
                }
                else
                {
                    DbColumnNumeric dbColumnNumeric = dbColumn as DbColumnNumeric;
                    return "NUMERIC(" + dbColumnNumeric.Precision + "," + dbColumnNumeric.Scale + ")" + notNullString;
                }
                
            }
            else if (dbColumn is DbColumnPr)
            {
                return "NUMERIC(8)" + notNullString;
            }
            else if (dbColumn is DbColumnText)
            {
                DbColumnText dbColumnText = dbColumn as DbColumnText;
                return "VARCHAR(" + dbColumnText.MaxLength + ")" + notNullString;
            }
            else
            {
                throw new NotImplementedException();
            }

        }

        
    }
}
