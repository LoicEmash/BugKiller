using Egis.GenGenLib.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.IO
{
    public abstract class GeneratorDb : GeneratorBase
    {
        public String SqlFile { get; set; }
       
        public virtual void GeneratePreDelete(ScriptWriter writer, Revision sourceRevision, Revision targetRevision) { }
        public virtual void GenerateUser(ScriptWriter writer,Revision sourceRevision, Revision targetRevision) { }
        public virtual void GenerateRole(ScriptWriter writer, Revision sourceRevision, Revision targetRevision) { }
        public virtual void GenerateSchema(ScriptWriter writer, Revision sourceRevision, Revision targetRevision) { }
        public virtual void GenerateTable(ScriptWriter writer, Revision sourceRevision, Revision targetRevision) { }
        public virtual void GenerateView(ScriptWriter writer, Revision sourceRevision, Revision targetRevision) { }
        public virtual void GeneratePk(ScriptWriter writer, Revision sourceRevision, Revision targetRevision) { }
        public virtual void GenerateFk(ScriptWriter writer, Revision sourceRevision, Revision targetRevision) { }
        public virtual void GenerateUk(ScriptWriter writer, Revision sourceRevision, Revision targetRevision) { }
        public virtual void GenerateGrant(ScriptWriter writer, Revision sourceRevision, Revision targetRevision) { }
        public virtual void GenerateSequence(ScriptWriter writer, Revision sourceRevision, Revision targetRevision) { }
        public virtual void GenerateTrigger(ScriptWriter writer, Revision sourceRevision, Revision targetRevision) { }
        public virtual void GenerateComment(ScriptWriter writer, Revision sourceRevision, Revision targetRevision) { }

        public override void Generate(Revision sourceRevision, Revision targetRevision)
        {
            using (ScriptWriter writer = new ScriptWriter(SqlFile,"-- "))
            {
                this.GeneratePreDelete(writer, sourceRevision, targetRevision);
                this.GenerateUser(writer,sourceRevision, targetRevision);
                this.GenerateRole(writer, sourceRevision, targetRevision);
                this.GenerateSchema(writer, sourceRevision, targetRevision);
                this.GenerateTable(writer, sourceRevision, targetRevision);
                this.GenerateView(writer, sourceRevision, targetRevision);
                this.GeneratePk(writer, sourceRevision, targetRevision);
                this.GenerateFk(writer, sourceRevision, targetRevision);
                this.GenerateUk(writer, sourceRevision, targetRevision);
                this.GenerateSequence(writer, sourceRevision, targetRevision);
                this.GenerateTrigger(writer, sourceRevision, targetRevision);
                this.GenerateGrant(writer, sourceRevision, targetRevision);
                this.GenerateComment(writer, sourceRevision, targetRevision);
            }
           
        }
    }
}
