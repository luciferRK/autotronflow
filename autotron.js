let tronWeb;
let userAddress;
const contractAddress="TFodXM8dPGHNHFwifwWDTiCJirrCA2KPx1";

jQuery(window).on("load", function() { 
    walletLoad();
});


async function walletLoad(){
    let one=document.getElementById('tronweb_no');          
    let two=document.getElementById('no-tron-web');         
    let three=document.getElementById('no-tron-extension');   
    let four=document.getElementById('tron-web-notloggedin');
    let five=document.getElementById('tron-extension-link');
    let six=document.getElementById('tronweb_yes'); 
    let seven=document.getElementById('tronweb_yes'); 
    one.style.display='none';
    two.style.display='none';
    three.style.display='none';
    four.style.display='none';
    five.style.display='none';
    six.style.display='none';
    if(window.tronWeb){
        if(window.tronWeb.defaultAddress.base58){
            tronWeb=window.tronWeb;
            userAddress=window.tronWeb.defaultAddress.base58;
            const contract=await tronWeb.contract().at(contractAddress);
            contract.MapByAddress_User(userAddress)
                .call()
                .then(result=>{
                    if (result.isExist){
                        seven.style.display='block';
                    }
                    else{
                        six.style.display='block';
                    }
                })
                .catch(error=>{
                    alert(error);
                });;
        }
        else{
            one.style.display='block';
            two.style.display='block';
            four.style.display='block';
        }
    }
    else{
        one.style.display='block';
        two.style.display='block';
        three.style.display='block';
        five.style.display='block';
    }
}

// tronWeb.trx.getBalance(userAddress, (error, userBalance) => {
//     if(error)
//         return console.error(error);
//     console.log(`User's balance is: ${ userBalance }`);
// });

async function viewMethod(){
    const contract=await tronWeb.contract().at(contractAddress);
    contract.owner().call()
        .then(result=>{
            console.log("Successfully called owner");
            console.log(result);
        })
        .catch(e=>{
            console.log("Error",e);
        });
}

async function registerUser(){
    let referre =document.getElementById("refer").value;
    if (referre.length==0){
        referre="0x0x0000000000000000000000000000000000000000";
    }
    else if(referre.length!=34){
        alert("Invalid Referre Address");
        return;
    }
    const contract=await tronWeb.contract().at(contractAddress);
    contract
        .registerNewUser(referre)
        .send({
            callValue:400000000,
            shouldPollResponse:true
        })
        .then(result=>{
            console.log("Successfully registered");
            console.log(result);
        })
        .catch(e=>{
            console.log("Error",e);
        });
}
