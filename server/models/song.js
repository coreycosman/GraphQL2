const { Lyric } = require("./lyric");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  lyrics: [
    {
      type: Schema.Types.ObjectId,
      ref: "lyric"
    }
  ]
});

SongSchema.statics.addLyric = async function(id, content) {
  const song = await this.findById(id);
  const lyric = await new Lyric({ content, song });
  song.lyrics.push(lyric);
  await song.save();
  await lyric.save();
  console.log(song.lyrics.length);
  return song;
};

SongSchema.statics.findLyrics = function(id) {
  return this.findById(id)
    .populate("lyrics")
    .then(song => song.lyrics);
};

mongoose.model("song", SongSchema);
