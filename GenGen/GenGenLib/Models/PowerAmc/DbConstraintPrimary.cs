using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.ObjectModel;
namespace Egis.GenGenLib.Models.PowerAmc
{
    public class DbConstraintPrimary : DbConstraint
    {
        public String TableId { get; set; }
        public  ObservableCollection<String> ColumnIds { get; set; }
        public String Name { get; set; }
        public String DisplayName { get; set; }
        public DbConstraintPrimary()
        {
            this.ColumnIds = new ObservableCollection<string>();
        }
    }
}
