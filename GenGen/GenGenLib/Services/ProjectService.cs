using Egis.GenGenLib.Models;
using Egis.GenGenLib.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Egis.GenGenLib.Services
{
    public class ProjectService
    {
        

        public void Save(string fileName, ProjectViewModel viewModel)
        {
            if (fileName == null)
            { throw new ArgumentNullException(); }

            if (viewModel == null)
            { throw new ArgumentNullException(); }
            String tempFile = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
            while (File.Exists(tempFile))
            { tempFile = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName()); }
            using (FileStream stream = new FileStream(tempFile, FileMode.Create))
            {
                XmlSerializer serializer = new XmlSerializer(typeof (Project ));
                serializer.Serialize(stream, viewModel.Model);
                stream.Flush();
            }
            File.Copy(tempFile, fileName, true);
        }

        public ProjectViewModel Load(string fileName)
        {

            if (fileName == null)
            { throw new ArgumentNullException(); }

            

            ProjectViewModel project = null;

            using (FileStream stream = new FileStream(fileName, FileMode.Open))
            {
                XmlSerializer serializer = new XmlSerializer(typeof(Project));
                project = new ProjectViewModel(serializer.Deserialize(stream) as Project);

            }
           
            return project;
        }

      
    }
}
