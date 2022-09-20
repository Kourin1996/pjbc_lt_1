// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Test {
    uint16 private a; // storage 0
    uint16 private b; // storage 0

    string private c; // storage 1
    string private d; // storage 2

    uint256[] e; // storage 3

    mapping(address => bool) f; // storage 4

    constructor(
        uint16 _a,
        uint16 _b,
        string memory _c,
        string memory _d,
        uint256[] memory _e,
        address[] memory _fKeys,
        bool[] memory _fValues
    ) {
        a = _a;
        b = _b;
        c = _c;
        d = _d;
        e = _e;

        for(uint256 i = 0; i<_fKeys.length; i++) {
            f[_fKeys[i]] = _fValues[i];
        }
    }
}
