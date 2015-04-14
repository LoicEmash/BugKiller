using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.Models.PowerAmc
{
    public class DbConstraintUnique : DbConstraint
    {
        public String TableId { get; set; }
         public  ObservableCollection<String> ColumnIds { get; set; }
         public String Name { get; set; }
         public String DisplayName { get; set; }
        public DbConstraintUnique()
        {
            this.ColumnIds = new ObservableCollection<string>();
        }
    }
}
