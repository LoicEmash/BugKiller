using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace System
{
    public static class StringExtension
    {
        /// <summary>
        /// Trasforme une chaine text hexadécimal en tableau de byte
        /// </summary>
        /// <param name="hexString">chaine hexadécimal</param>
        /// <returns>Tableau de bytes</returns>
        public static byte[] HexToByteArray(this String hexString)
        {
            int NumberChars = hexString.Length;
            byte[] bytes = new byte[NumberChars / 2];
            for (int i = 0; i < NumberChars; i += 2)
            { bytes[i / 2] = Convert.ToByte(hexString.Substring(i, 2), 16); }
            return bytes;
        }

        /// <summary>
        /// Transforme une chaine text en CamelCase à partir du séprateur _
        /// Exemple : oh_elt_insp -> OhEltInsp
        /// </summary>
        /// <param name="value">Chaine texte</param>
        /// <param name="separator">Chaine texte au format CamelCase</param>
        /// <returns></returns>
        public static String ToCamelCase(this string value, string separator = "_")
        {
            List<String> values = value.Split(separator.ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();
            string result = "";
            foreach (String str in values)
            {
                if (str.Length > 1)
                { result += str.Substring(0, 1).ToUpper() + str.Substring(1).ToLower(); }
                else
                { result += str.ToUpper(); }
            }
            return result;
        }

        public static String ToJavaScriptCase(this string value, string separator = "_")
        {
            List<String> values = value.Split(separator.ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();
            string result = "";
            foreach (String str in values)
            {
                if (str.Length > 1)
                { result += str.Substring(0, 1).ToUpper() + str.Substring(1).ToLower(); }
                else
                { result += str.ToUpper(); }
            }
            if (result.Length > 1)
            {
                return result.Substring(0, 1).ToLower() + result.Substring(1);
            }
            else
            { return result.ToLower(); }
         
        }
    }
}
