using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.Models.PowerAmc
{
    public class DbColumn : DbObject
    {
        public List<string> AttachedRuleIds { get; set; }
        public Boolean AllowNull { get; set; }
        public String TableId { get; set; }
        public String Name { get; set; }
        public String DisplayName { get; set; }

        public DbColumn()
        {
            this.AttachedRuleIds = new List<string>();
        }
    }
}
