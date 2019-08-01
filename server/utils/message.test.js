var expect= require('expect');

var {generateMessage, generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
  it('should generate correct message object',()=>{
    var from='Akki';
    var text='Some msg';
    var message= generateMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  })
});

describe('generateLocationMessage',()=>{
  it('should generate correct location', ()=>{
    var from='Akki';
    var latitude= 30.350281;
    var longitude=76.375335;
    var url= 'https://www.google.com/maps?q=30.350281,76.375335';
    var message= generateLocationMessage({from,latitude,longitude});

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,url});
  });
});
