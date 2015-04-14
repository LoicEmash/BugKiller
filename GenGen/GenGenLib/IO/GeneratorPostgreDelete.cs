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
    public class GeneratorPostgreDelete : GeneratorDb
    {

        public override string DisplayName
        {
            get { return "Postgre : Supression"; }
        }
       
        public override void GenerateUser(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateUser(writer, sourceRevision, targetRevision);
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {
                
                    writer.WriteComment("Supression des utilisateurs du schéma " + targetSchema.Name);
                    writer.WriteLine("DROP USER " + targetSchema.Name + "_user_consult;");
                    writer.WriteLine("DROP USER " + targetSchema.Name + "_user_admin;");
                

            }
            writer.WriteLine("");
        }

       

        public override void GenerateSchema(ScriptWriter writer, Revision sourceRevision, Revision targetRevision)
        {
            base.GenerateSchema(writer, sourceRevision, targetRevision);
            foreach (DbSchema targetSchema in targetRevision.ResultSchemas)
            {
               
                    writer.WriteComment("Supression du schéma " + targetSchema.Name);
                    writer.WriteLine("DROP SCHEMA " + targetSchema.Name + " CASCADE;");
                    writer.WriteLine("DROP USER " + targetSchema.Name + ";");
                    writer.WriteLine("DROP ROLE " + targetSchema.Name + "_role_consult;");
                    writer.WriteLine("DROP ROLE " + targetSchema.Name + "_role_admin;");
              
                
            }
            writer.WriteLine("");
        }

      
       
      
       
        
    }
}
