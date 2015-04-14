using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.Models.PowerAmc
{
    public class DbConstraintForeignJoin : DbObject
    {
        public String ParentColumnId { get; set; }
        public String ChildColumnId { get; set; }
    }
}
