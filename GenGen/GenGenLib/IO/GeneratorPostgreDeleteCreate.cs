using Egis.GenGenLib.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.IO
{
    public class GeneratorPostgreDeleteCreate : GeneratorBase
    {
        public String SqlFile { get; set; }

        public override string DisplayName
        {
            get { return "Postgre : Supression -> Création"; }
        }

        public override void Generate(Revision sourceRevision, Revision targetRevision)
        {
            String tmpFileDelete = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
            while (File.Exists(tmpFileDelete))
            { tmpFileDelete = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName()); }

            GeneratorPostgreDelete generatorDelete = new GeneratorPostgreDelete();
            generatorDelete.SqlFile = tmpFileDelete;
            generatorDelete.Generate(sourceRevision, targetRevision);



            String tmpFileCreate = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
            while (File.Exists(tmpFileCreate))
            { tmpFileCreate = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName()); }

            GeneratorPostgreCreate generatorCreate = new GeneratorPostgreCreate();
            generatorCreate.SqlFile = tmpFileCreate;
            generatorCreate.Generate(sourceRevision, targetRevision);
            
            using (ScriptWriter writer = new ScriptWriter(SqlFile))
            {
                using (FileStream stream = new FileStream(tmpFileDelete, FileMode.Open))
                {
                    StreamReader reader = new StreamReader(stream);
                    writer.WriteLine(reader.ReadToEnd());
                }

                using (FileStream stream = new FileStream(tmpFileCreate, FileMode.Open))
                {
                    StreamReader reader = new StreamReader(stream);
                    writer.WriteLine(reader.ReadToEnd ());
                    
                }
            }
            File.Delete(tmpFileDelete);
            File.Delete(tmpFileCreate);
        }
    }
}
