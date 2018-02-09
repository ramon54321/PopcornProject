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
    * _static_
        * [.createBlock(data, previousBlockIndex)](#module_Blockchain.createBlock) ⇒ <code>object</code>
        * [.addBlock(block)](#module_Blockchain.addBlock) ⇒ <code>boolean</code>
    * _inner_
        * [~hashData(data)](#module_Blockchain..hashData) ⇒ <code>string</code>

<a name="module_Blockchain.createBlock"></a>

### Blockchain.createBlock(data, previousBlockIndex) ⇒ <code>object</code>
Creates a new block.

**Kind**: static method of [<code>Blockchain</code>](#module_Blockchain)  
**Returns**: <code>object</code> - The new block.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | The block data. |
| previousBlockIndex | <code>number</code> | The index of the previous block in the blockchain. |

<a name="module_Blockchain.addBlock"></a>

### Blockchain.addBlock(block) ⇒ <code>boolean</code>
Adds a block to the blockchain.

**Kind**: static method of [<code>Blockchain</code>](#module_Blockchain)  
**Returns**: <code>boolean</code> - True if the block was successfully added.  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>object</code> | The block to add. |

<a name="module_Blockchain..hashData"></a>

### Blockchain~hashData(data) ⇒ <code>string</code>
Hashes the data with the set blockchain public key.

**Kind**: inner method of [<code>Blockchain</code>](#module_Blockchain)  
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

