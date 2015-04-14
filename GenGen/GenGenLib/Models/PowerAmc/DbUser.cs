using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.Models.PowerAmc
{
    public abstract class DbUser : DbCustomObject
    {
        public String Name { get; set; }
        public String DisplayName { get; set; }
        public DbUser()
            : base()
        {
        }
    }
}
