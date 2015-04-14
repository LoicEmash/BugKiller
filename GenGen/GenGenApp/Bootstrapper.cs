using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Microsoft.Practices.Unity;
using Egis.GenGenApp.ViewModels;
using Egis.GenGenApp.Views;
using Microsoft.Practices.Prism.Modularity;
using Egis.GenGenLib.Services;
using Egis.GenGenLib.Models;
using Egis.GenGenLib.ViewModels;

namespace Egis.GenGenApp
{
    public class Bootstrapper : Microsoft.Practices.Prism.UnityExtensions.UnityBootstrapper
    {
        protected override void ConfigureContainer()
        {
            base.ConfigureContainer();
            this.Container.RegisterType<MainViewModel>(new ContainerControlledLifetimeManager());
            this.Container.RegisterType<MainView>(new ContainerControlledLifetimeManager());
            this.Container.RegisterType<ProjectService>(new ContainerControlledLifetimeManager());
        }
        protected override DependencyObject CreateShell()
        {
            return this.Container.Resolve<MainView>();
        }
        
        protected override void InitializeShell()
        {
            this.Container.Resolve<MainView>().Show();
        }
        protected override void InitializeModules()
        {
            base.InitializeModules();
          

        }
    }
}
