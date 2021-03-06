using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using kindergartenNetwork;
using kindergartenNetwork.Models;

namespace kindergartenNetwork.Helper
{
    public class GeneralHelper
    {
        private static kindergartenNetworkEntities db = new kindergartenNetworkEntities();
        public static string GetErrorMessage(ModelStateDictionary ms, string errorHeader)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(errorHeader + ":\n<button class=\"close\" data-close=\"alert\"></button><ul>");
            foreach (var key in ms.Keys)
            {
                var error = ms[key].Errors.FirstOrDefault();
                var getAttrName = key.Split('.');
                if (error != null)
                {
                    sb.Append("<li>" + error.ErrorMessage + "</li>");
                }
            }
            sb.Append("</ul>");
            return sb.ToString();
        }
        public static List<Constant> GetConstants(int parentId)
        {
            var lstConstant = new List<Constant>();
            var getWeekDays = db.Constants.Where(x => x.ParentId == parentId).ToList();
            if (getWeekDays.Count > 0)
                lstConstant = getWeekDays;

            return lstConstant;
        }
        public static ImageFormat GetImageFormt(string ext)
        {
            ext = ext.ToLower();
            if (ext == ".png")
                return ImageFormat.Png;
            else if (ext == ".gif")
                return ImageFormat.Gif;
            else if (ext == ".bmp")
                return ImageFormat.Bmp;
            else
                return ImageFormat.Jpeg;
        }
        public static void ResizeImage(string sourcefile, string destinationfile, int width, string ext, bool isThumb)
        {
            ImageFormat format = GetImageFormt(ext);
            var img = System.Drawing.Image.FromFile(sourcefile);
            if (img.Width >= width)
            {
                var w = width;
                var h = w * img.Height / img.Width;
                if (isThumb)
                {
                    System.Drawing.Image thImg = img.GetThumbnailImage(w, h, null, IntPtr.Zero);
                    thImg.Save(destinationfile, format);
                    thImg.Dispose();
                }
                else
                {
                    System.Drawing.Bitmap bitmap = new System.Drawing.Bitmap(img, w, h);
                    bitmap.Save(destinationfile, format);
                    bitmap.Dispose();
                }
            }
            else
            {
                System.Drawing.Bitmap bitmap = new System.Drawing.Bitmap(img, img.Width, img.Height);
                //bitmap.Clone(Rectangle.Round(new RectangleF(0,0,50,50)), PixelFormat.DontCare);
                bitmap.Save(destinationfile, format);
                bitmap.Dispose();
            }
        }

    }
}