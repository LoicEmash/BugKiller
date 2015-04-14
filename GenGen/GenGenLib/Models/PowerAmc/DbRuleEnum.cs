using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Egis.GenGenLib.Models.PowerAmc
{
    public class DbRuleEnum : DbRule 
    {
        public List<DbEnumValue> Values { get; set; }

        public DbRuleEnum()
        {
            this.Values = new List<DbEnumValue>();
        }
    }
}
