## Modules

<dl>
<dt><a href="#module_Blockchain">Blockchain</a></dt>
<dd></dd>
<dt><a href="#module_Database">Database</a></dt>
<dd></dd>
<dt><a href="#module_Logger">Logger</a></dt>
<dd></dd>
<dt><a href="#module_Transactions">Transactions</a></dt>
<dd></dd>
<dt><a href="#module_WebServer">WebServer</a></dt>
<dd></dd>
</dl>

<a name="module_Blockchain"></a>

## Blockchain

* [Blockchain](#module_Blockchain)
    * [.loadBlockchain(blocks)](#module_Blockchain+loadBlockchain)
    * [.getLength()](#module_Blockchain+getLength) ⇒ <code>number</code>
    * [.createBlock(data, previousBlockIndex)](#module_Blockchain+createBlock) ⇒ <code>object</code>
    * [.addBlock(block)](#module_Blockchain+addBlock) ⇒ <code>boolean</code>
    * [.isValid()](#module_Blockchain+isValid) ⇒ <code>boolean</code>
    * [.hashBlock(block)](#module_Blockchain+hashBlock) ⇒ <code>string</code>
    * [.hashData(data)](#module_Blockchain+hashData) ⇒ <code>string</code>

<a name="module_Blockchain+loadBlockchain"></a>

### blockchain.loadBlockchain(blocks)
Inserts blocks fetched from database to blockchain array.

**Kind**: instance method of [<code>Blockchain</code>](#module_Blockchain)  

| Param | Type | Description |
| --- | --- | --- |
| blocks | <code>object</code> | All block's |

<a name="module_Blockchain+getLength"></a>

### blockchain.getLength() ⇒ <code>number</code>
Gets the length of the blockchain.

**Kind**: instance method of [<code>Blockchain</code>](#module_Blockchain)  
**Returns**: <code>number</code> - The length of the blockchain.  
<a name="module_Blockchain+createBlock"></a>

### blockchain.createBlock(data, previousBlockIndex) ⇒ <code>object</code>
Creates a new block.

**Kind**: instance method of [<code>Blockchain</code>](#module_Blockchain)  
**Returns**: <code>object</code> - The new block.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | The block data. |
| previousBlockIndex | <code>number</code> | The index of the previous block in the blockchain. |

<a name="module_Blockchain+addBlock"></a>

### blockchain.addBlock(block) ⇒ <code>boolean</code>
Adds a block to the blockchain.

**Kind**: instance method of [<code>Blockchain</code>](#module_Blockchain)  
**Returns**: <code>boolean</code> - True if the block was successfully added.  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>object</code> | The block to add. |

<a name="module_Blockchain+isValid"></a>

### blockchain.isValid() ⇒ <code>boolean</code>
Validate the entire blockchain. This function will iterate the chain, oneblock at a time, checking that the block contains the same hash as theprevious block's hash, and that the hash of the current block is indeedcorrect.

**Kind**: instance method of [<code>Blockchain</code>](#module_Blockchain)  
**Returns**: <code>boolean</code> - True if the blockchain is valid in its entirity.  
<a name="module_Blockchain+hashBlock"></a>

### blockchain.hashBlock(block) ⇒ <code>string</code>
Hashes the block.

**Kind**: instance method of [<code>Blockchain</code>](#module_Blockchain)  
**Returns**: <code>string</code> - The hash in hex form.  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>object</code> | The block to hash. |

<a name="module_Blockchain+hashData"></a>

### blockchain.hashData(data) ⇒ <code>string</code>
Hashes the data with the set blockchain public key.

**Kind**: instance method of [<code>Blockchain</code>](#module_Blockchain)  
**Returns**: <code>string</code> - The hash in hex form.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | The data to hash. |

<a name="module_Database"></a>

## Database
<a name="module_Logger"></a>

## Logger
<a name="exp_module_Logger--module.exports"></a>

### module.exports(level, message) ⏏
**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>string</code> | log level. |
| message | <code>string</code> | message to log. |

<a name="module_Transactions"></a>

## Transactions

* [Transactions](#module_Transactions)
    * _static_
        * [.createRequest(userid, amount)](#module_Transactions.createRequest) ⇒ <code>object</code>
        * [.getRequest(code)](#module_Transactions.getRequest) ⇒ <code>object</code>
        * [.getRequestsFromUser(userid)](#module_Transactions.getRequestsFromUser) ⇒ <code>object</code>
        * [.deleteRequest(code)](#module_Transactions.deleteRequest) ⇒ <code>object</code>
    * _inner_
        * [~generateCode()](#module_Transactions..generateCode) ⇒ <code>object</code>
        * [~isUnique(code)](#module_Transactions..isUnique) ⇒ <code>boolean</code>

<a name="module_Transactions.createRequest"></a>

### Transactions.createRequest(userid, amount) ⇒ <code>object</code>
Creates a new request object that is added to requests[].

**Kind**: static method of [<code>Transactions</code>](#module_Transactions)  
**Returns**: <code>object</code> - The request object.  

| Param | Type | Description |
| --- | --- | --- |
| userid | <code>string</code> | Requester's userID. |
| amount | <code>number</code> | Amount to transfer. |

<a name="module_Transactions.getRequest"></a>

### Transactions.getRequest(code) ⇒ <code>object</code>
Gets request by code.

**Kind**: static method of [<code>Transactions</code>](#module_Transactions)  
**Returns**: <code>object</code> - The request object.  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | Request's code. |

<a name="module_Transactions.getRequestsFromUser"></a>

### Transactions.getRequestsFromUser(userid) ⇒ <code>object</code>
Gets all request by user

**Kind**: static method of [<code>Transactions</code>](#module_Transactions)  
**Returns**: <code>object</code> - List of requests  

| Param | Type | Description |
| --- | --- | --- |
| userid | <code>string</code> | Userid |

<a name="module_Transactions.deleteRequest"></a>

### Transactions.deleteRequest(code) ⇒ <code>object</code>
Deletes request by code

**Kind**: static method of [<code>Transactions</code>](#module_Transactions)  
**Returns**: <code>object</code> - The request object.  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | Request's code. |

<a name="module_Transactions..generateCode"></a>

### Transactions~generateCode() ⇒ <code>object</code>
Generates a new code.

**Kind**: inner method of [<code>Transactions</code>](#module_Transactions)  
**Returns**: <code>object</code> - The new code.  
<a name="module_Transactions..isUnique"></a>

### Transactions~isUnique(code) ⇒ <code>boolean</code>
Checks that the code doesn't already exists in requests[].

**Kind**: inner method of [<code>Transactions</code>](#module_Transactions)  
**Returns**: <code>boolean</code> - True if code is unique.  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>object</code> | Code to check. |

<a name="module_WebServer"></a>

## WebServer

* [WebServer](#module_WebServer)
    * [.linkSessionWithUser(request, userid)](#module_WebServer+linkSessionWithUser)
    * [.createTransactionRequest(userid, amount)](#module_WebServer+createTransactionRequest) ⇒ <code>string</code>
    * [.confirmTransaction(code, userid, routeCallback)](#module_WebServer+confirmTransaction)
    * [.createBalanceSheet()](#module_WebServer+createBalanceSheet)
    * [.updateBalanceSheet(from, to, amount)](#module_WebServer+updateBalanceSheet)
    * [.addUserToBalanceSheet(userid)](#module_WebServer+addUserToBalanceSheet)
    * [.getBalanceById(id)](#module_WebServer+getBalanceById) ⇒ <code>number</code>
    * [.getBankBalance()](#module_WebServer+getBankBalance) ⇒ <code>number</code>
    * [.getCirculationBalance()](#module_WebServer+getCirculationBalance) ⇒ <code>number</code>
    * [.initializeBlockchain()](#module_WebServer+initializeBlockchain)
    * [.getCalculatedValue()](#module_WebServer+getCalculatedValue) ⇒ <code>number</code>

<a name="module_WebServer+linkSessionWithUser"></a>

### webServer.linkSessionWithUser(request, userid)
Links the created session with the user in the request body. The sessionuserid can then be used to look up details with respect to the activeuser from a database for example.The user can have multiple sessions open because all sessions will pointto the same userid, meaning all actions will be taken on the sameinstance of the user, irrespective from which session the changes aremade.

**Kind**: instance method of [<code>WebServer</code>](#module_WebServer)  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>object</code> | Request object containing the session to which the userid will be added. |
| userid | <code>number</code> | The userid to add to the session. |

<a name="module_WebServer+createTransactionRequest"></a>

### webServer.createTransactionRequest(userid, amount) ⇒ <code>string</code>
Creates a transaction request, which can be retrieved using the returnedcode. The transaction request also stores the time of creation, and isvalid for a set period of time. Be sure to create a transaction requestonly when the confirmation of the transaction is expected soon.

**Kind**: instance method of [<code>WebServer</code>](#module_WebServer)  
**Returns**: <code>string</code> - A random code which can be used to reference to thistransaction request.  

| Param | Type | Description |
| --- | --- | --- |
| userid | <code>number</code> | The id of the user requesting the transaction. |
| amount | <code>number</code> | The amount of currency to transfer in the transaction. |

<a name="module_WebServer+confirmTransaction"></a>

### webServer.confirmTransaction(code, userid, routeCallback)
Confirms the requested transaction by locking it into the blockchain. Thetransaction request is also deleted.

**Kind**: instance method of [<code>WebServer</code>](#module_WebServer)  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | The code received when creating the transaction request. |
| userid | <code>number</code> | User's id |
| routeCallback | <code>function</code> | The function to call after the promise resolves. Customer can only confirm requests made by stores or another customers Store can only confirm requests made by customers or banks Bank can only confirm requests made by stores OLD BEHAVIOUR: True if the transaction was added to the blockchain pool. False if there was an error in adding the request, commonly caused by the request with the given code not being present in the transaction requests array. Ensure the code was first created with 'createTransactionRequest'. The request code will only be deleted if the returned value is true. |

<a name="module_WebServer+createBalanceSheet"></a>

### webServer.createBalanceSheet()
Creates balance sheet to store coin amount and user type with userid.Fetches all persons from database and sets their balance to zero, and thenfetches all blocks from database and updates the balance sheet accordinglyto the transactions. Note that the first block with the initial transfer forthe bank, determining the total amount of coins in distribution, does notcome from any person in the database, so only the bank is added to thebalance sheet with the first transaction.

**Kind**: instance method of [<code>WebServer</code>](#module_WebServer)  
<a name="module_WebServer+updateBalanceSheet"></a>

### webServer.updateBalanceSheet(from, to, amount)
Updates balance sheet

**Kind**: instance method of [<code>WebServer</code>](#module_WebServer)  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>object</code> | Sender |
| to | <code>object</code> | Receiver |
| amount | <code>object</code> |  |

<a name="module_WebServer+addUserToBalanceSheet"></a>

### webServer.addUserToBalanceSheet(userid)
Adds new registered user to balance sheet

**Kind**: instance method of [<code>WebServer</code>](#module_WebServer)  

| Param | Type | Description |
| --- | --- | --- |
| userid | <code>number</code> | User's id |

<a name="module_WebServer+getBalanceById"></a>

### webServer.getBalanceById(id) ⇒ <code>number</code>
Get user's balance by id from balanceSheet

**Kind**: instance method of [<code>WebServer</code>](#module_WebServer)  
**Returns**: <code>number</code> - User's balance  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>object</code> | User's id |

<a name="module_WebServer+getBankBalance"></a>

### webServer.getBankBalance() ⇒ <code>number</code>
Get bank's balance from balanceSheet, hardcoded with bank's id

**Kind**: instance method of [<code>WebServer</code>](#module_WebServer)  
**Returns**: <code>number</code> - Bank's balance  
<a name="module_WebServer+getCirculationBalance"></a>

### webServer.getCirculationBalance() ⇒ <code>number</code>
Calculates the total number of coins in balance sheet

**Kind**: instance method of [<code>WebServer</code>](#module_WebServer)  
**Returns**: <code>number</code> - Total number of coins  
<a name="module_WebServer+initializeBlockchain"></a>

### webServer.initializeBlockchain()
Initializes the blockchain in servers memory by fetching all the blocksfrom database and passing them to loadBlockChain function, which addsthem to blockchain array.

**Kind**: instance method of [<code>WebServer</code>](#module_WebServer)  
<a name="module_WebServer+getCalculatedValue"></a>

### webServer.getCalculatedValue() ⇒ <code>number</code>
Gets the calculated value of a single coin. This can also be consideredthe 'stock price' of the coin.The value can be manipulated with a push value in the formula, whichencourages the movement of coins into or out of the bank.Defaults to a nominal value of 5, with a centered lookup, resulting ina constant 5 being returned if the required functions can not be found.

**Kind**: instance method of [<code>WebServer</code>](#module_WebServer)  
**Returns**: <code>number</code> - The calculated value of the coin.  
