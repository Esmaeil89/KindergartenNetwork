using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kindergartenNetwork.Models.NewsModels
{
    public class MediaAlbumsModel
    {
        public MediaAlbum OMediaAlbum { get; set; }
    }
    public class MediaModel
    {
        public MediaModel()
        {
            LstMediaAlbums = new List<MediaAlbum>();
            ListMediaType = new List<Constant>();
        }
        public Medium OMedia { get; set; }
        public List<MediaAlbum> LstMediaAlbums { get; set; }

        public List<Constant> ListMediaType { get; set; }
    }
}