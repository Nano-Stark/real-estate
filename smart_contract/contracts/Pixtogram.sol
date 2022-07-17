// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Pixtogram {
    string public name = "Pixtogram";
  address public owner = msg.sender;
  mapping(address => mapping(uint => Image)) public images;
  mapping(address => User) public users;

  struct Image {
    uint id;
    string imgHash;
    string description;
    uint tipAmount;
    address payable author;
  }
    struct User {
    string username;
    uint imgCount;
  }
    event ImageCreated (
    uint id,
    string imgHash,
    string description,
    uint tipAmount,
    address payable author
    );

     event ImageTipped (
    uint id,
    string imgHash,
    string description,
    uint tipAmount,
    address payable author
    );

  function registerUser(string memory _username) public {
    users[msg.sender] = User(_username, 0);
  }

function uploadImage(string memory _imgHash, string memory _description) public {
    images[msg.sender][users[msg.sender].imgCount] = Image(users[msg.sender].imgCount, _imgHash, _description, 0, payable(msg.sender));
    emit ImageCreated(users[msg.sender].imgCount, _imgHash, _description, 0, payable(msg.sender));
    users[msg.sender].imgCount++;
}

function tipAuthor(uint _id, address _authorAddress) public payable {
  Image memory _image = images[_authorAddress][_id];
  require(_authorAddress == _image.author);
  payable(_image.author).transfer(msg.value);
  _image.tipAmount += msg.value;
  images[_authorAddress][_id] = _image;
  
  emit ImageTipped(_id, _image.imgHash, _image.description, _image.tipAmount, _image.author);
}

}
