using Egis.GenGenLib.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.IO
{
    public class GeneratorOracleDeleteCreate : GeneratorBase
    {
        public String SqlFile { get; set; }

        public override string DisplayName
        {
            get { return "Oracle : Supression -> Création"; }
        }

        public override void Generate(Revision sourceRevision, Revision targetRevision)
        {
            String tmpFileDelete = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
            while (File.Exists(tmpFileDelete))
            { tmpFileDelete = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName()); }

            GeneratorOracleDelete generatorDelete = new GeneratorOracleDelete();
            generatorDelete.SqlFile = tmpFileDelete;
            generatorDelete.Generate(sourceRevision, targetRevision);



            String tmpFileCreate = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
            while (File.Exists(tmpFileCreate))
            { tmpFileCreate = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName()); }

            GeneratorOracleCreate generatorCreate = new GeneratorOracleCreate();
            generatorCreate.SqlFile = tmpFileCreate;
            generatorCreate.Generate(sourceRevision, targetRevision);
            string line = null;
            using (ScriptWriter writer = new ScriptWriter(SqlFile))
            {
                using (FileStream stream = new FileStream(tmpFileDelete, FileMode.Open))
                {
                    StreamReader reader = new StreamReader(stream);
                    
                        while ((line = reader.ReadLine()) != null)
                        {
                            writer.WriteLine(line);
                        }
                    
                }

                using (FileStream stream = new FileStream(tmpFileCreate, FileMode.Open))
                {
                    StreamReader reader = new StreamReader(stream);
                    
                        while ((line = reader.ReadLine()) != null)
                        {
                            writer.WriteLine(line);
                        }
                    
                }
            }
            File.Delete(tmpFileDelete);
            File.Delete(tmpFileCreate);
        }
    }
}
