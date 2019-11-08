pragma solidity ^0.5.6;

contract Verification {
    mapping(address => bool) isAdmin;

    constructor() public {
        isAdmin[msg.sender] = true;
    }

    struct DID {
        string identifier;
        uint64 expiry;
        string data;
    }

    mapping(string => mapping(string => DID)) didList;

    function promoteAdmin(address user) public {
        require(isAdmin[msg.sender] == true, "Access Denied");
        isAdmin[user] = true;
    }
    function demoteAdmin(address user) public {
        require(isAdmin[msg.sender] == true, "Access Denied");
        isAdmin[user] = false;
    }

    function registerLicense(string memory _phoneNumberHash, string memory _type, string memory _identifier, uint64 _expiry, string memory _data) public {
        require(isAdmin[msg.sender] == true, "Access Denied");
        DID memory newDiD;
        newDiD.identifier = _identifier;
        newDiD.expiry = _expiry;
        newDiD.data = _data;

        didList[_phoneNumberHash][_type] = newDiD;
    }

    function getLicense(string memory _phoneNumberHash, string memory _type) public view returns (uint64, string memory) {
        return (didList[_phoneNumberHash][_type].expiry, didList[_phoneNumberHash][_type].data);
    }

    function invalidateLicense(string memory _phoneNumberHash, string memory _type) public {
        require(isAdmin[msg.sender] == true, "Access Denied");
        delete didList[_phoneNumberHash][_type];
    }
}