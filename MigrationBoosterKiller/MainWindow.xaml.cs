using Npgsql;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Xml;

namespace MigrationBoosterKiller
{
    /// <summary>
    /// Logique d'interaction pour MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            List<int> storyIds = new List<int>();
            XmlDocument document = new XmlDocument();
            document.Load(@"C:\Users\loic\Documents\GIT\BugKiller\Documents\emashbug.xml");
            using (FileStream stream = new FileStream(@"C:\Users\loic\Documents\GIT\BugKiller\Documents\emashbug.sql", FileMode.Create))
            {
                StreamWriter writer = new StreamWriter(stream);
                XmlNodeList list =   document.SelectNodes("/database/table");
                foreach (XmlNode node in list)
                {
                    if (node.Attributes["name"].Value == "client_bt")
                    {

                        writer.WriteLine("insert into bk.bk_client (nom) values ('" + node.FirstChild.InnerText .Replace ("'","''")+ "');");
                    }
                }

                foreach (XmlNode node in list)
                {
                    if (node.Attributes["name"].Value == "utilisateur_bt")
                    {
                        string nom = node.SelectSingleNode("column[@name='UTILISATEUR_BT__NOM']").InnerText + " " + node.SelectSingleNode("column[@name='UTILISATEUR_BT__PRENOM']").InnerText;
                        string mail = node.SelectSingleNode("column[@name='UTILISATEUR_BT__EMAIL']").InnerText;
                        string client = node.SelectSingleNode("column[@name='CLIENT_BT_NOM']").InnerText;
                        string password = node.SelectSingleNode("column[@name='UTILISATEUR_BT__PASS']").InnerText;
                        writer.WriteLine("insert into bk.bk_user (bk_client__id,name,password,mail) values ((select id from bk.bk_client where lower(nom)=lower('" + client.Replace("'", "''") + "')),'" + nom.Replace("'", "''") + "','" + password + "','"+mail+"');");
                    }
                }

                /*
                 * 
                 *         <!-- Table observation_bt -->
        <table name="observation_bt">
            <column name="SITE_BT_NOM">Développeur </column>
            <column name="CLIENT_BT_NOM">EMASH_ASK</column>
            <column name="UTILISATEUR_BT__EMAIL">m.hubert@emash.fr</column>
            <column name="PROJET_BT__NOM">BugBooster</column>
            <column name="SOUS_SYSTEME_BT__NOM">MAIN</column>
            <column name="VERSION_BT__PROJETNOM_SOUSYSTEMENOM_DATE">Non sélectionnée</column>
            <column name="ETAT_BT__NUMERO">5</column>
            <column name="OBSERVATION_BT__NUMERO_OBSERVATION">15</column>
            <column name="OBSERVATION_BT__ANOMALIE_REPRODUCTIBLE">0</column>
            <column name="OBSERVATION_BT__SEVERITE">mineur</column>
            <column name="OBSERVATION_BT__PRIORITE">lente</column>
            <column name="OBSERVATION_BT__PIECE_JOINTE"></column>
            <column name="OBSERVATION_BT__OS">vista</column>
            <column name="OBSERVATION_BT__DATE_OBSERVATION">2011-09-20 13:37:12</column>
            <column name="OBSERVATION_BT__TYPE">recette</column>
            <column name="OBSERVATION_BT__RESUME">Tri colone dans le Grid.</column>
            <column name="OBSERVATION_BT__DESCRIPTION">Dans les tableau, la fonction tri-colonne n'est pas opérationnelle</column>
            <column name="OBSERVATION_BT__DATE_NOTE_DEV">2013-07-17 10:08:26</column>
            <column name="OBSERVATION_BT__DATE_REPRISE_CORRECTION">2011-09-20 13:37:12</column>
            <column name="OBSERVATION_BT__RAPPORTEUR"> HUBERT  Michel</column>
            <column name="OBSERVATION_BT__TIME_DELAI_EXECUTION">47819</column>
        </table>
                 * */
               
                foreach (XmlNode node in list)
                {
                    if (node.Attributes["name"].Value == "observation_bt")
                    {
                        string mail = node.SelectSingleNode("column[@name='UTILISATEUR_BT__EMAIL']").InnerText;
                        string prod = node.SelectSingleNode("column[@name='PROJET_BT__NOM']").InnerText;
                        string app = node.SelectSingleNode("column[@name='SOUS_SYSTEME_BT__NOM']").InnerText;
                        string sev = node.SelectSingleNode("column[@name='OBSERVATION_BT__SEVERITE']").InnerText;
                        string prio = node.SelectSingleNode("column[@name='OBSERVATION_BT__PRIORITE']").InnerText;
                        string repro = node.SelectSingleNode("column[@name='OBSERVATION_BT__ANOMALIE_REPRODUCTIBLE']").InnerText;
                        string date = node.SelectSingleNode("column[@name='OBSERVATION_BT__DATE_OBSERVATION']").InnerText;
                        string title = node.SelectSingleNode("column[@name='OBSERVATION_BT__RESUME']").InnerText.Replace("&quot;", "'"); 
                        string id = node.SelectSingleNode("column[@name='OBSERVATION_BT__NUMERO_OBSERVATION']").InnerText;
                        storyIds.Add(Int32.Parse ( id));
                        if (repro == "0")
                        { repro = "no"; }
                        if (repro == "1")
                        { repro = "yes"; }
                        string post = node.SelectSingleNode("column[@name='OBSERVATION_BT__DESCRIPTION']").InnerText.Replace("&quot;", "'");
                            //OBSERVATION_BT__DESCRIPTION
                        if (title == "")
                        {
                            title = post;
                        }
                        if (title == "NULL")
                        {
                            title = post;
                        }
                        writer.WriteLine("insert into bk.bk_story (id,bk_user__id,prod,app,sev,prio,repro,dc,title) values (" + id + ",(select id from bk.bk_user where lower(mail)=lower('" + mail.Replace("'", "''") + "')),'" + prod.Replace("'", "''") + "','" + app.Replace("'", "''") + "','" + sev + "','" + prio + "','" + repro + "',to_date('" + date + "','YYYY-MM-DD HH24:MI:SS'),'" + title.Replace("'", "''") + "');");
                        writer.WriteLine("insert into bk.bk_post (bk_story__id,bk_user__id,content,state,dc) values (" + id + ",(select id from bk.bk_user where lower(mail)=lower('" + mail.Replace("'", "''") + "')),'" + post.Replace("'", "''") + "','open',to_date('" + date + "','YYYY-MM-DD HH24:MI:SS'));");

                    }
                }
                writer.WriteLine("SELECT setval('bk.bk_story_id_seq', (select max( id)+1 from bk.bk_story) );  ");

                foreach (XmlNode node in list)
                {
                    if (node.Attributes["name"].Value == "note_bt")
                    {
                        string mail = node.SelectSingleNode("column[@name='UTILISATEUR_BT__EMAIL']").InnerText;
                        string post = node.SelectSingleNode("column[@name='NOTE_BT__CONTENT']").InnerText;
                        string date = node.SelectSingleNode("column[@name='NOTE_BT_DATE']").InnerText;                       
                        string idStory = node.SelectSingleNode("column[@name='OBSERVATION_BT__NUMERO_OBSERVATION']").InnerText;
                        string idNote = node.SelectSingleNode("column[@name='NOTE_BT__NUMERO']").InnerText;
                        //NOTE_BT__NUMERO
                        string stateNumber = node.SelectSingleNode("column[@name='ETAT_BT__NUMERO']").InnerText;
                        string etat = "unknow";
                        if (stateNumber == "1")
                        { etat = "open"; }
                        else if (stateNumber == "2")
                        { etat = "delivery"; }
                        else if (stateNumber == "3")
                        { etat = "ask"; }
                        else if (stateNumber == "4")
                        { etat = "watch"; }
                        else if (stateNumber == "5")
                        { etat = "resolved"; }
                        else if (stateNumber == "6")
                        { etat = "closed"; }

                        writer.WriteLine("insert into bk.bk_post (bk_story__id,bk_user__id,content,state,dc) values (" + idStory + ",(select id from bk.bk_user where lower(mail)=lower('" + mail.Replace("'", "''") + "')),'" + post.Replace("'", "''") + "','" + etat + "',to_date('" + date + "','YYYY-MM-DD HH24:MI:SS'));");
                    }
                }
                writer.WriteLine("SELECT setval('bk.bk_post_id_seq', (select max (id)+1 from bk.bk_post) );  ");

                foreach (XmlNode node in list)
                {
                    if (node.Attributes["name"].Value == "observation_bt")
                    {
                        string mail = node.SelectSingleNode("column[@name='UTILISATEUR_BT__EMAIL']").InnerText;
                        string prod = node.SelectSingleNode("column[@name='PROJET_BT__NOM']").InnerText;
                        string app = node.SelectSingleNode("column[@name='SOUS_SYSTEME_BT__NOM']").InnerText;
                        string sev = node.SelectSingleNode("column[@name='OBSERVATION_BT__SEVERITE']").InnerText;
                        string prio = node.SelectSingleNode("column[@name='OBSERVATION_BT__PRIORITE']").InnerText;
                        string repro = node.SelectSingleNode("column[@name='OBSERVATION_BT__ANOMALIE_REPRODUCTIBLE']").InnerText;
                        string date = node.SelectSingleNode("column[@name='OBSERVATION_BT__DATE_OBSERVATION']").InnerText;
                        string title = node.SelectSingleNode("column[@name='OBSERVATION_BT__RESUME']").InnerText.Replace ("&quot;","'");
                        string id = node.SelectSingleNode("column[@name='OBSERVATION_BT__NUMERO_OBSERVATION']").InnerText;
                        string post = node.SelectSingleNode("column[@name='OBSERVATION_BT__DESCRIPTION']").InnerText.Replace("&quot;", "'");
                        //OBSERVATION_BT__DESCRIPTION
                        if (title == "")
                        {
                            title = post;
                        }
                       // writer.WriteLine("insert into bk.bk_story (id,bk_user__id,prod,app,sev,prio,repro,dc,title) values (" + id + ",(select id from bk.bk_user where lower(mail)=lower('" + mail.Replace("'", "''") + "')),'" + prod.Replace("'", "''") + "','" + app.Replace("'", "''") + "','" + sev + "','" + prio + "','" + repro + "',to_date('" + date + "','YYYY-MM-DD HH24:MI:SS'),'" + title.Replace("'", "''") + "');");
                      //  writer.WriteLine("insert into bk.bk_post (bk_story__id,bk_user__id,content,state,dc) values (" + id + ",(select id from bk.bk_user where lower(mail)=lower('" + mail.Replace("'", "''") + "')),'" + post.Replace("'", "''") + "','open',to_date('" + date + "','YYYY-MM-DD HH24:MI:SS'));");

                    }
                }
                writer.WriteLine("update bk.bk_user set mail='loic.lecuyer@egis.fr',password='70e92d4fbe843ce266bc6f1f2d643526' where mail='l.lecuyer@emash.fr';");
                writer.WriteLine("update bk.bk_story set sev = 'minor' where sev='mineur';");
                writer.WriteLine("update bk.bk_story set sev = 'minor' where sev='mineure';");
                writer.WriteLine("update bk.bk_story set sev = 'major' where sev='majeure';");
                writer.WriteLine("update bk.bk_story set sev = 'critical' where sev='bloquante';");
                writer.WriteLine("update bk.bk_story set sev = 'minor' where sev='information';");
                writer.WriteLine("update bk.bk_story set prio = 'minor' where prio='lente';");
                writer.WriteLine("update bk.bk_story set prio = 'major' where prio='normale';");
                writer.WriteLine("update bk.bk_story set prio = 'critical' where prio='urgente';");
                
                writer.Flush();

                
               

            }

            using (FileStream stream = new FileStream(@"C:\Users\loic\Documents\GIT\BugKiller\Documents\emashbug_data.sql", FileMode.Create))
            {
                StreamWriter writer = new StreamWriter(stream);
                string uploadPath = @"C:\Users\loic\Documents\GIT\uploads";
                String[] files = Directory.GetFiles(uploadPath, "*.*", SearchOption.AllDirectories);
                foreach (String file in files)
                {
                   // NpgsqlConnection connection = new NpgsqlConnection("Server=127.0.0.1;Port=5432;Database=bk;User Id=postgres;Password=Emash21;");
                  //  connection.Open();
                    FileInfo fileInfo = new FileInfo(file);
                    if (fileInfo.Name.IndexOf("-") > 0)
                    {
                        String[] fileNameComponents = fileInfo.Name.Split("-".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
                        int storyId = -1;
                        if (Int32.TryParse(fileNameComponents[0], System.Globalization.NumberStyles.None, System.Globalization.CultureInfo.InvariantCulture, out storyId))
                        {
                            if (storyIds.Contains(storyId))
                            {
                                FileStream uploadStream = new FileStream(file, FileMode.Open);
                                Console.WriteLine("stream.Length:" + uploadStream.Length);
                                if (uploadStream.Length > 0)
                                {
                                    byte[] data = new byte[uploadStream.Length];
                                    uploadStream.Read(data, 0, (int)uploadStream.Length);
                                    String base64 = Convert.ToBase64String(data);
                                    string sql = "insert into bk.bk_fio (bk_story__id,name,ext,content) values (" + storyId + ",'" + fileInfo.Name.Replace("'", "''") + "','" + fileInfo.Extension.Substring(1) + "',decode('" + base64 + "','base64'));";
                                    writer.WriteLine(sql);
                                    writer.Flush();                                  
                                }

                                uploadStream.Close();
                                uploadStream.Dispose();
                            }

                        }
                    }
                   
                }
            }
           
               
            
            

        }
    }
}
