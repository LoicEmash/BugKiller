using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Egis.GenGenLib.Models.PowerAmc
{
    public class DbView : DbObject
    {
        public String Name { get; set; }
        public String DisplayName { get; set; }
        public String Sql { get; set; }
        [XmlElement("ColumnFile", typeof(DbColumnFile))]
        [XmlElement("ColumnImage", typeof(DbColumnImage))]        
        [XmlElement("ColumnText", typeof(DbColumnText))]
        [XmlElement("ColumnBool", typeof(DbColumnBool))]
        [XmlElement("ColumnDate", typeof(DbColumnDate))]      
        [XmlElement("ColumnId", typeof(DbColumnId))]
        [XmlElement("DbColumnNumeric", typeof(DbColumnNumeric))]
        [XmlElement("ColumnDateHeure", typeof(DbColumnDateHeure))]
        [XmlElement("ColumnLongText", typeof(DbColumnLongText))]
        [XmlElement("ColumnPr", typeof(DbColumnPr))]
        [XmlElement("ColumnGeom", typeof(DbColumnGeom))]
        public ObservableCollection<DbColumn> Columns { get; set; }

        public DbView()
        {
            this.Columns = new ObservableCollection<DbColumn>();
        }
        //ColumnVBin
    }
}
