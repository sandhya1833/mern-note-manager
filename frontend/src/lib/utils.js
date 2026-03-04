export function formateDate(data){
    return data.toLocaleDateString('en-US',{
        month:'short',
        day:'numeric',
        year:'numeric',
    })
}