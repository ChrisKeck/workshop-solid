const assert=require('node:assert');
const test=require('node:test');
const UnicodeFileToHtmTextConverter=require('../unicode-file-to-htm-text-converter/unicode-file-to-htm-text-converter');

test.describe('check something', {},async() => {
	// check that 1+1 equals 2
	await test.it('',()=>{
		const subject=new UnicodeFileToHtmTextConverter('1234')
		let result;
		subject.convertToHtml((item)=>result=item)
		assert.equal(result, '1234');
	})
	await test.it('2',()=>{
		const subject=new UnicodeFileToHtmTextConverter('< > & \n')
		let result;
		subject.convertToHtml((item)=>result=item)
		assert.equal(result, '&lt; &gt; &amp; <br />');
	})
});
