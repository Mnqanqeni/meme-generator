import { useEffect, useState } from "react"

export default function Main() {
    const [dataMemes,setDataMemes]= useState([])
    const [meme,setMeme]=useState({
        topText:"One does not simply",
        bottomText:"Walk into Mordor",
        imgUrl:"http://i.imgflip.com/1bij.jpg"
    })

    function handleBottom(event){
        setMeme(prevMeme=>({...prevMeme,bottomText:event.target.value}))
    }
    function handleTop(event){
        setMeme(prevMeme=>({...prevMeme,topText:event.target.value}))
    }

    function handleImg(){
        setMeme(prevMeme=>({...prevMeme,imgUrl:dataMemes[0][Math.floor(Math.random()*dataMemes[0].length)].url}))
    }

    useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes')
        .then(response=>{
            if(!response.ok){
                throw new Error("Failed to fetch memes");
            }
            return response.json();
        }).then(data=>{
            setDataMemes([data.data.memes])
        })
    })
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleTop}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleBottom}
                    />
                </label>
                <button onClick={handleImg}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imgUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom" >{meme.bottomText}</span>
            </div>
        </main>
    )
}