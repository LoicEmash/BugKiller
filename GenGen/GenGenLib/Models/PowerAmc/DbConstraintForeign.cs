using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.ObjectModel;
namespace Egis.GenGenLib.Models.PowerAmc
{
    public class DbConstraintForeign : DbConstraint
    {
        public Boolean OnUpdateCascade { get; set; }
        public Boolean OnDeleteCascade { get; set; }

        public String Cardinality { get; set; }
        public String Name { get; set; }
        public String DisplayName { get; set; }
        public String ParentTableId { get; set; }
        public String ChildTableId { get; set; }
        public ObservableCollection<DbConstraintForeignJoin> Joins { get; set; }

        public DbConstraintForeign()
        {
            this.Joins = new ObservableCollection<DbConstraintForeignJoin>();
        }
    }
}
