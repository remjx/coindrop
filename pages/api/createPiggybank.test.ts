// Mock dependencies before imports
jest.mock('@google-cloud/storage', () => ({
  Storage: jest.fn().mockImplementation(() => ({
    bucket: jest.fn().mockReturnValue({
      file: jest.fn().mockReturnValue({
        move: jest.fn(),
      }),
    }),
  })),
}));

jest.mock('../../utils/auth/firebaseAdmin', () => ({
  db: {
    collection: jest.fn(),
  },
}));

jest.mock('../../utils/storage/image-paths', () => ({
  piggybankImageStoragePath: jest.fn(),
}));

jest.mock('../page-slugs.json', () => [], { virtual: true });

import { createPiggybank } from './createPiggybank';
import { db } from '../../utils/auth/firebaseAdmin';

describe('createPiggybank API', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        newPiggybankName: 'testpiggy',
        piggybankData: {
          name: 'Test Piggy',
          website: 'https://valid.com',
        },
      },
      headers: {
        uid: 'user123',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
      send: jest.fn(),
    };

    // Setup default successful DB mocks
    const mockDoc = {
      get: jest.fn().mockResolvedValue({ exists: false }),
      set: jest.fn().mockResolvedValue(true),
    };

    const mockQuerySnapshot = {
        size: 0,
        empty: true,
    };

    (db.collection as jest.Mock).mockReturnValue({
      doc: jest.fn().mockReturnValue(mockDoc),
      where: jest.fn().mockReturnValue({
        get: jest.fn().mockResolvedValue(mockQuerySnapshot),
      }),
    });
  });

  it('should return 200 for valid input', async () => {
    await createPiggybank(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 400 for malicious website URL', async () => {
    req.body.piggybankData.website = 'javascript:alert(1)';
    await createPiggybank(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Website URL is invalid.');
  });
});
