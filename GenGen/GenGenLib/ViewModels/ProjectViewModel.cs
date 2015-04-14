using Egis.GenGenLib.IO;
using Egis.GenGenLib.Models;
using Egis.GenGenLib.Models.PowerAmc;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Xml.Serialization;

namespace Egis.GenGenLib.ViewModels
{
    public class ProjectViewModel : BindableBase
    {
       
        public Revision LastRevision
        {
            get
            {
                return (from r in this.Model.Revisions orderby r.Number descending select r).FirstOrDefault();
            }
        }
        private Revision _selectedUpgradeRevision;

        public Revision SelectedUpgradeRevision
        {
            get { return _selectedUpgradeRevision; }
            set { _selectedUpgradeRevision = value; this.OnPropertyChanged("SelectedUpgradeRevision"); this.OnPropertyChanged("LastRevision"); }
        }
        private Revision _selectedRevision;

        public Revision SelectedRevision
        {
            get { return _selectedRevision; }
            set { _selectedRevision = value; this.OnPropertyChanged("SelectedRevision"); this.OnPropertyChanged("LastRevision"); }
        }
        public DelegateCommand CommandGenerateAll { get; private set; }
         public DelegateCommand CommandAddOrUpdateMpd { get; private set; }
        public DelegateCommand<GeneratorBase> CommandAddGenerator { get; set; }
        public List<GeneratorBase> GeneratorInstances { get; private set; }

        protected Project _model;
        [XmlIgnore()]
        public String LastFileName { get; set; }



        public Project Model
        {
            get
            {
                return this._model;
            }
        }

        public ProjectViewModel(Project model)
        {
            if (model == null)
            { throw new ArgumentNullException(); }
            this._model = model;
            this.CommandAddGenerator = new DelegateCommand<GeneratorBase>(DoAddGenerator);
            this.CommandAddOrUpdateMpd = new DelegateCommand(DoAddOrUpdateMpd);
            this.CommandGenerateAll = new DelegateCommand(DoGenerateAll);
            this.GeneratorInstances = new List<GeneratorBase>();
            this.GeneratorInstances.Add(new GeneratorPostgreCreate());
            this.GeneratorInstances.Add(new GeneratorPostgreDelete());
            this.GeneratorInstances.Add(new GeneratorPostgreDeleteCreate());
            this.GeneratorInstances.Add(new GeneratorOracleCreate());
            this.GeneratorInstances.Add(new GeneratorOracleDelete());           
            this.GeneratorInstances.Add(new GeneratorOracleDeleteCreate());
            this.GeneratorInstances.Add(new GeneratorExtJsModel());
            this.GeneratorInstances.Add(new GeneratorDoctrineEntity());
           
        }

        private void DoGenerateAll()
        {
            foreach (GeneratorBase generator in this._model.Generators)
            {
                generator.Generate(this.SelectedUpgradeRevision, this.LastRevision);
            }
        }

        private void DoAddGenerator(GeneratorBase obj)
        {
            if (obj != null)
            {
                GeneratorBase clone = Activator.CreateInstance(obj.GetType()) as GeneratorBase;
                this._model.Generators.Add(clone);

            }
        }

         private void DoAddOrUpdateMpd()
        {
            OpenFileDialog dialog = new OpenFileDialog();
            dialog.Title = "Fichier MPD";
            dialog.Multiselect = true;
            dialog.Filter = "Fichier MPD PowerAmc|*.mpd";
            Nullable<Boolean> result = dialog.ShowDialog();
            if (result.HasValue && result.Value == true)
            {

                String[] files = dialog.FileNames;
                List<String> errors = new List<string> ();
                foreach (String file in files)
                {
                    try
                    {
                        Revision lastRevision = (from r in _model.Revisions orderby r.Number descending  select r).FirstOrDefault();
                        Revision nextRevision = new Revision();
                        _model.Revisions.Insert(0, nextRevision);
                        nextRevision.Number = lastRevision.Number + 1;
                        MpdReader reader = new MpdReader(file);
                        if (reader.Schema.IsModule)
                        {
                            nextRevision.ModuleSchemas .Add (reader.Schema);
                           
                        }
                        else
                        {
                            nextRevision.MetierSchemas.Add(reader.Schema);
                           
                        }
                        this.GenerateResultSchemas();
                        this.SelectedRevision = nextRevision;
                        this.SelectedUpgradeRevision = lastRevision;
               
                    }
                    catch (MpdReaderException ex)
                    {
                        FileInfo info = new FileInfo(file);
                        errors.Add("Fichier "+info.Name + " : "+ex.Message );
                    }

                   
                }
                if (errors.Count > 0)
                {
                    MessageBox.Show("Veuillez corrgier les erreurs de modèlisation suivantes : \r\n" + string.Join("\r\n", errors), "Erreur de modèlisation", MessageBoxButton.OK, MessageBoxImage.Exclamation);
                }
               
            }
        }

         private void GenerateResultSchemas()
         {
             Revision lastRevision = (from r in _model.Revisions orderby r.Number descending select r).FirstOrDefault();
             lastRevision.ResultSchemas.Clear();
             foreach (DbSchema dbSchema in lastRevision.MetierSchemas)
             { lastRevision.ResultSchemas.Add(dbSchema); }
         }

     
    }
}
