using Egis.GenGenLib.Models;
using Egis.GenGenLib.Services;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Interactivity.InteractionRequest;
using Microsoft.Practices.Unity;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using System.ComponentModel;
using System.IO;
using Microsoft.Practices.Prism.Mvvm;
using Egis.GenGenLib.ViewModels;


namespace Egis.GenGenApp.ViewModels
{
    public class MainViewModel : BindableBase
    {
        private ProjectViewModel _currentProject;
      
        public DelegateCommand CommandCreateProject { get; private set; }
        public DelegateCommand CommandOpenProject { get; private set; }
        public DelegateCommand CommandSaveProject { get; private set; }
        public DelegateCommand CommandSaveAsProject { get; private set; }
        public DelegateCommand CommandCloseProject { get; private set; }
        public DelegateCommand CommandExit { get; private set; }
        
        public IUnityContainer Container { get; private set; }

        public ProjectViewModel CurrentProject
        {
            get
            {
                return _currentProject;
            }

            set
            {
                _currentProject = value;
                this.OnPropertyChanged("CurrentProject");
            }
        }

        public MainViewModel(IUnityContainer container)
        {
            if (container == null)
            { throw new ArgumentNullException(); }
            this.Container = container;
            this.InstanciateCommands();
       
        }

        private void InstanciateCommands()
        {
            this.CommandCreateProject = new DelegateCommand(DoCreateProject, CanDoCreateProject);
            this.CommandOpenProject = new DelegateCommand(DoOpenProject, CanDoOpenProject);
            this.CommandSaveProject = new DelegateCommand(DoSaveProject, CanDoSaveProject);
            this.CommandSaveAsProject = new DelegateCommand(DoSaveAsProject, CanDoSaveAsProject);
            this.CommandCloseProject = new DelegateCommand(DoCloseProject, CanDoCloseProject);
            this.CommandExit = new DelegateCommand(DoExit, CanDoExit);
        }

        private void DoCreateProject()
        {

            Revision firstRevision = new Revision();
            firstRevision.Number = 1;
            Project project = new Project();
            project.Revisions.Add(firstRevision);
            this.CurrentProject = new ProjectViewModel(project);
            this.CurrentProject.SelectedRevision = (from r in project.Revisions orderby r.Number descending select r).FirstOrDefault();
            this.RaiseCommandChange();
            Console.WriteLine("project created");
               
        }

        private void RaiseCommandChange()
        {
            this.CommandCreateProject.RaiseCanExecuteChanged();
            this.CommandOpenProject.RaiseCanExecuteChanged();
            this.CommandSaveProject.RaiseCanExecuteChanged();
            this.CommandSaveAsProject.RaiseCanExecuteChanged();
            this.CommandCloseProject.RaiseCanExecuteChanged();
            this.CommandExit.RaiseCanExecuteChanged();
        }

        private Boolean CanDoCreateProject()
        { return this.CurrentProject == null; }

        private void DoOpenProject()
        {
           OpenFileDialog dialog = new OpenFileDialog();
            dialog.Title = "Ouvrir";
            Nullable<Boolean> result = dialog.ShowDialog();
            if (result.HasValue && result.Value == true)
            {
                
                ProjectViewModel project = this.Container.Resolve<ProjectService>().Load(dialog.FileName);
                this.CurrentProject = project;
                this.CurrentProject.LastFileName = dialog.FileName;
                this.CurrentProject.SelectedRevision = project.LastRevision;
                this.CurrentProject.SelectedUpgradeRevision = (from r in project.Model.Revisions where r.Number < project.LastRevision.Number orderby r.Number descending select r).FirstOrDefault();
               this.RaiseCommandChange();
            }
        }

        private Boolean CanDoOpenProject()
        { return this.CurrentProject == null; }

        private void DoSaveProject()
        {
            this.Container.Resolve<ProjectService>().Save(this.CurrentProject.LastFileName, this.CurrentProject);
            Console.WriteLine("save file to " + this.CurrentProject.LastFileName);
            this.RaiseCommandChange();
        }

        private Boolean CanDoSaveProject()
        { return  this.CurrentProject != null && this.CurrentProject .LastFileName != null && File.Exists (this.CurrentProject.LastFileName ); }


        private void DoSaveAsProject()
        {
            SaveFileDialog dialog = new SaveFileDialog();
            dialog.Title = "Sauver sous ...";

            dialog.DefaultExt = ".GenGen";
            dialog.Filter = "Fichier projetGenGen|*.GenGen";
            Nullable<Boolean> result = dialog.ShowDialog();
            if (result.HasValue && result.Value == true)
            {
                this.CurrentProject.LastFileName = dialog.FileName;
                this.Container.Resolve<ProjectService>().Save(dialog.FileName,this.CurrentProject);
               
                this.RaiseCommandChange();
            }
            
        }

        private Boolean CanDoSaveAsProject()
        { return this.CurrentProject != null; }


        private void DoCloseProject()
        {
            this.CurrentProject = null;
            this.RaiseCommandChange();
        }

        private Boolean CanDoCloseProject()
        { return this.CurrentProject != null; }


        private void DoExit()
        { System.Windows.Application.Current.Shutdown(); }

        private Boolean CanDoExit()
        { return this.CurrentProject == null; ; }
    }
}
