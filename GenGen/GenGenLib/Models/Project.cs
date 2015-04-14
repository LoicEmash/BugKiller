using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using System.Collections.ObjectModel;
using Egis.GenGenLib.IO;
using Egis.GenGenLib.Models.PowerAmc;
namespace Egis.GenGenLib.Models
{
    public class Project 
    {

        [XmlElement("DoctrineEntity",typeof(GeneratorDoctrineEntity))]
        [XmlElement("ExtJsModel", typeof(GeneratorExtJsModel))]
        [XmlElement("OracleDelete", typeof(GeneratorOracleDelete))]
        [XmlElement("OracleCreate", typeof(GeneratorOracleCreate))]
        [XmlElement("OracleDeleteCreate", typeof(GeneratorOracleDeleteCreate))]
        [XmlElement("PostgreCreate", typeof(GeneratorPostgreCreate))]
        [XmlElement("PostgreDelete", typeof(GeneratorPostgreDelete))]
        [XmlElement("PostgreDeleteCreate", typeof(GeneratorPostgreDeleteCreate))]    
        public ObservableCollection<GeneratorBase> Generators { get; set; }
        public ObservableCollection<Revision> Revisions { get; set; }
        
        public Project()
        {
           
            this.Generators = new ObservableCollection<GeneratorBase>();
            this.Revisions = new ObservableCollection<Revision>();
        }

       
  
    }
}
