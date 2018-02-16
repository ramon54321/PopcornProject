## Modules

<dl>
<dt><a href="#module_Blockchain">Blockchain</a></dt>
<dd></dd>
<dt><a href="#module_Utils">Utils</a></dt>
<dd></dd>
</dl>

<a name="module_Blockchain"></a>

## Blockchain

* [Blockchain](#module_Blockchain)
    * [.getLength()](#module_Blockchain+getLength) ⇒ <code>number</code>
    * [.createBlock(data, previousBlockIndex)](#module_Blockchain+createBlock) ⇒ <code>object</code>
    * [.addBlock(block)](#module_Blockchain+addBlock) ⇒ <code>boolean</code>
    * [.isValid()](#module_Blockchain+isValid) ⇒ <code>boolean</code>
    * [.hashBlock(block)](#module_Blockchain+hashBlock) ⇒ <code>string</code>
    * [.hashData(data)](#module_Blockchain+hashData) ⇒ <code>string</code>

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
Validate the entire blockchain. This function will iterate the chain, one
block at a time, checking that the block contains the same hash as the
previous block's hash, and that the hash of the current block is indeed
correct.

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

<a name="module_Utils"></a>

## Utils
<a name="module_Utils.getDouble"></a>

### Utils.getDouble(x) ⇒ <code>number</code>
The function that doubles the input given to it. Or so I think.

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
**Returns**: <code>number</code> - Double the given parameter.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The parameter to double. |

