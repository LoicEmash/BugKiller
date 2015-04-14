using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Egis.GenGenLib.Models.PowerAmc
{
    
    public  class DbRuleCollection : DbObject
    {
         [XmlElement("DbRuleEnum", typeof(DbRuleEnum))]
         public List<DbRule> Rules { get; set; }

         public DbRuleCollection()
         {
             this.Rules = new List<DbRule>();
         }
    }   
}
