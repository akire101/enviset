import {test} from 'node:test';
import assert from 'node:assert/strict';
import {officeOpen,needsReminder,messageInput} from '../app/support-model';
test('Bratislava opening hours and DST boundaries',()=>{for(const [utc,open] of [['2026-10-27T06:59:00Z',false],['2026-10-27T07:00:00Z',true],['2026-10-27T15:59:59Z',true],['2026-10-27T16:00:00Z',false],['2026-10-31T10:00:00Z',false],['2026-07-27T06:00:00Z',true],['2026-07-27T15:00:00Z',false]] as const)assert.equal(officeOpen(new Date(utc)),open,utc)});
test('unread escalation begins after five minutes',()=>{assert.equal(needsReminder(null,600000),false);assert.equal(needsReminder(1000,300999),false);assert.equal(needsReminder(1000,301000),true)});
test('messages reject empty, overlong and unknown content',()=>{assert.equal(messageInput.safeParse({id:crypto.randomUUID(),text:' '}).success,false);assert.equal(messageInput.safeParse({id:crypto.randomUUID(),text:'x'.repeat(2001)}).success,false);assert.equal(messageInput.safeParse({id:crypto.randomUUID(),text:'Ahoj',role:'admin'}).success,false)});
