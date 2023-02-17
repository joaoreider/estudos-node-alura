
import chalk from "chalk";

function extraiLinks(arrLinks){

   return arrLinks.map((objetoLink) => Object.values(objetoLink).join())

}


function manejaErros(erro){

    if (erro.cause.code === 'ENOTFOUND'){
        return 'link n encontrado'
    }
    else {
        return 'erro interno'
    }
}


async function checaStatus(listaUrls){

    const arrStatus = await Promise.all(

        listaUrls.map(async (url) => {
            try {
                
                const response =  await fetch(url)
        
                return response.status;
            } catch (erro){
                return manejaErros(erro)
            }
        })
        
    )

    return arrStatus;
}




export default async function listaValidada(listaDeLinks){
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links)
    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }));
}

