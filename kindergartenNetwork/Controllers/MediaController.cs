using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace kindergartenNetwork.Controllers
{
    public class MediaController : Controller
    {
        // GET: Media
        public ActionResult ImagesGallery()
        {
            return View();
        }
        public ActionResult VideosGallery()
        {
            return View();
        }
    }
}