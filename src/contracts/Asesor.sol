pragma solidity ^0.5.0;

contract Asesor {
    struct Upload{
        uint id;
        string namaMitra;
        string alamat;
        string tlp;
        string status;
        address author;
    }

    mapping(uint => Upload) public uploads;
    uint public idCount = 0;
     
    event UploadCreated(
        uint id,
        string namaMitra,
        string alamat,
        string tlp,
        string status,
        address author
    );

    function uploadPost(string memory _namaMitra, string memory _alamat, string memory _tlp, string memory _status) public {
        idCount++;
        uploads [idCount] = Upload(idCount, _namaMitra, _alamat, _tlp, _status, msg.sender);
        emit UploadCreated(idCount, _namaMitra, _alamat, _tlp, _status, msg.sender);
    }
}