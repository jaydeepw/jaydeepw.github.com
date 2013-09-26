package com.learning.service;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

public class ServiceDemo extends Service {

	private static final String TAG = "ServiceDemo";
	
	@Override
	public IBinder onBind(Intent arg0) {
		return null;
	}
	
	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		
		Log.i(TAG, "Service has been started.");
		
		return START_STICKY;
	}
	
	@Override
	public void onDestroy() {
		
		Log.i(TAG, "Service has been stopped.");
		
		super.onDestroy();
	}

}
