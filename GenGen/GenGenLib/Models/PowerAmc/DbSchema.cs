using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using System.Collections.ObjectModel;
namespace Egis.GenGenLib.Models.PowerAmc
{
    public class DbSchema : DbObject
    {
       
        public DbRuleCollection Rules { get; set; }
        public List<String> ModuleSchemaDeploy { get; set; }
        public Boolean ModuleSchemaDeployAll { get; set; }
        public ObservableCollection<DbView> Views { get; set; }
        public ObservableCollection<DbTable> Tables { get; set; }
        [XmlElement("DbRoleSelect", typeof(DbRoleSelect))]
        [XmlElement("DbRoleUpdate", typeof(DbRoleUpdate))]
        public ObservableCollection<DbRole> Roles { get; set; }
        [XmlElement("DbUserSelect", typeof(DbUserSelect))]
        [XmlElement("DbUserUpdate", typeof(DbUserUpdate))]
        public ObservableCollection<DbUser> Users { get; set; }
        public ObservableCollection<DbConstraintPrimary> DbConstraintPrimaries { get; set; }
        public ObservableCollection<DbConstraintUnique> DbConstraintUniques { get; set; }
        public ObservableCollection<DbConstraintForeign> DbConstraintForeigns { get; set; }
        [XmlIgnore()]
        public String TabHeader
        {
            get
            { return this.Name + " : " + this.DisplayName; }
        }
        [XmlIgnore()]
        public String VersionString
        {
            get
            { return this.MajorVersion + "." + this.MinorVersion+"."+this.RevisionVersion; }
        }

        [XmlIgnore()]
        public String SchemaType
        {
            get
            {
                if (this.IsModule)
                { return "Module"; }
                else
                { return "Metier"; }
            }
        }
        public String Name { get; set; }
        public String DisplayName { get; set; }
        public int MajorVersion { get; set; }
        public int MinorVersion { get; set; }
        public int RevisionVersion { get; set; }
        public Boolean IsModule { get; set; }

        public DbSchema()
        {
            this.Tables = new ObservableCollection<DbTable>();
            this.DbConstraintPrimaries = new ObservableCollection<DbConstraintPrimary>();
            this.DbConstraintUniques = new ObservableCollection<DbConstraintUnique>();
            this.DbConstraintForeigns = new ObservableCollection<DbConstraintForeign>();
            this.Roles = new ObservableCollection<DbRole>();
            this.Users = new ObservableCollection<DbUser>();
            this.ModuleSchemaDeploy = new List<string>();
            this.ModuleSchemaDeployAll = true;
            this.Views = new ObservableCollection<DbView>();
            this.Rules = new DbRuleCollection();
        }

       
    }
}
