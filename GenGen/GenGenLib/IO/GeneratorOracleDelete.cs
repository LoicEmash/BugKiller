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
    public class GeneratorOracleDelete : GeneratorDb
    {

        public override string DisplayName
        {
            get { return "Oracle : Supression"; }
        }
       
        public override void GenerateUser(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateUser(writer, sourceRevision, targetRevision);
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {
                if (!(from s in sourceRevision.ResultSchemas where s.Name.Equals(targetSchema.Name) select s).Any())
                {
                    writer.WriteComment("Supression des utilisateurs du schéma " + targetSchema.Name);
                    writer.WriteLine("DROP USER " + targetSchema.Name + "_user_consult CASCADE;");
                    writer.WriteLine("DROP USER " + targetSchema.Name + "_user_admin CASCADE;");
                }

            }
            writer.WriteLine("");
        }

        public override void GenerateRole(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateRole(writer, sourceRevision, targetRevision);
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {
                if (!(from s in sourceRevision.ResultSchemas where s.Name.Equals(targetSchema.Name) select s).Any())
                {
                    writer.WriteComment("Supression des roles du schéma " + targetSchema.Name);
                    writer.WriteLine("DROP ROLE " + targetSchema.Name + "_role_consult;");
                    writer.WriteLine("DROP ROLE " + targetSchema.Name + "_role_admin;");
                }
            }
            writer.WriteLine("");

        }

        public override void GenerateSchema(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateSchema(writer, sourceRevision, targetRevision);
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {
                if (!(from s in sourceRevision.ResultSchemas where s.Name.Equals(targetSchema.Name) select s).Any())
                {
                    writer.WriteComment("Supression du schéma " + targetSchema.Name);
                    writer.WriteLine("DROP USER " + targetSchema.Name + " CASCADE;");
                }
            }
            writer.WriteLine("");
        }

      
       
      
       
        
    }
}
