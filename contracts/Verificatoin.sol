pragma solidity ^0.5.6;

contract Verification {
    address admin;

    constructor() public {
        admin = msg.sender;
    }

    struct DiD {
        string phoneNumberHash;
        string licenseNumber;
        string licenseType;
        bool isAdult;
    }

    mapping(string => DiD) phoneNumber_DiD;

    function registerLicense(string memory _phoneNumberHash, string memory _licenseNumber, string memory _licenseType, bool _isAdult) public {
        DiD memory newDiD;
        newDiD.phoneNumberHash = _phoneNumberHash;
        newDiD.licenseNumber = _licenseNumber;
        newDiD.licenseType = _licenseType;
        newDiD.isAdult = _isAdult;

        phoneNumber_DiD[_phoneNumberHash] = newDiD;
    }

    function getLicense(string memory _phoneNumberHash) public view returns (string memory, string memory, bool) {
        require(bytes(phoneNumber_DiD[_phoneNumberHash].licenseNumber).length > 0, "Invalid licenseNumber");

        return (phoneNumber_DiD[_phoneNumberHash].licenseNumber, phoneNumber_DiD[_phoneNumberHash].licenseType, true);
    }
}