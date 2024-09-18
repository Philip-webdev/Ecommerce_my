const fs = require('fs');

/*fs.readFile('./docs/blog', (err, data) =>{
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
}); */

fs.writeFile('./docs/blog', 'hello world', ()=>{
    console.log('file was writtten');
});
if (!fs.existsSync('./assets'))
fs.mkdir('./assets', (err)=>{
    if (err){
        console.log(err);
    }
    console.log('file crreated');
});