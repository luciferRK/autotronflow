const contractAddress="TFodXM8dPGHNHFwifwWDTiCJirrCA2KPx1";

async function indexLoad(){
    console.log("Indexload called");
    if(window.tronWeb && window.tronWeb.defaultAddress.base58){
        const contract=await tronWeb.contract().at(contractAddress);
        contract.MapByAddress_User(userAddress)
            .call()
            .then(result=>{
                if (result.isExist){
                    document.getElementById('login_account_but').text="Account";
                }
                else{
                    document.getElementById('login_account_but').text="Register";
                }
            })
            .catch(error=>{
                console.log(error);
            });;
    }
    else{
        document.getElementById('login_account_but').text="Register";
    }
  }

indexLoad();