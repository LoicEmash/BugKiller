using Egis.GenGenLib.Models.PowerAmc;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.Models
{
    public class Revision
    {
        public int Number { get; set; }

        public ObservableCollection<DbSchema> ModuleSchemas { get; set; }
        public ObservableCollection<DbSchema> MetierSchemas { get; set; }
        public ObservableCollection<DbSchema> ResultSchemas { get; set; }

        public Revision()
        {
            this.ModuleSchemas = new ObservableCollection<DbSchema>();
            this.MetierSchemas = new ObservableCollection<DbSchema>();
            this.ResultSchemas = new ObservableCollection<DbSchema>();
        }
    }
}
