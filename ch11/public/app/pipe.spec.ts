/**
 * Created by dpitic on 17/03/17.
 * Pipes test specification.
 */
import {LowerCasePipe} from '@angular/common';

describe('LowerCasePipe tests', () => {
    let pipe = new LowerCasePipe();

    it('should capitalise', () => {
        expect(pipe.transform('MEAN')).toEqual('mean');
    });
})