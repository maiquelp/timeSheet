import connection from '../database/connection';
import Settings from '../models/Settings';

class SettingsRepository {
  public async update(settings: Settings) {
    await connection('settings').update(settings);
  };

  public async index() {
    const settings = await connection('settings').select('*');
    return settings;
  }

}

export default SettingsRepository;