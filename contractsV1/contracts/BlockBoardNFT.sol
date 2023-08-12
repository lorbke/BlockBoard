// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlockBoardNFT is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _token_counter;

    constructor() ERC721("BlockBoardNFT", "BBCNFT") {}

    function mint(address recipient) public returns (uint256 token_id) {
        _token_counter.increment();
        uint256 new_token_id = _token_counter.current();
        _mint(recipient, new_token_id);
        return new_token_id;
    }
}