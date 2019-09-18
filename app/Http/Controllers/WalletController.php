<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Wallet;
use App\Http\Resources\Wallet as walletsResource;

class WalletController extends Controller
{
    public function index()
    {
        //$wallet = Wallet::orderBy('created_at', 'desc')->paginate(10);        
        //return walletsResource::collection($wallet);
        $wallet = Wallet::all();
        return response()->json($wallet);
    }

    public function store(Request $request)
    {/*
        $this->validate($request,[
            'name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:wallets'],
            'password' => ['string'],
            'role' => ['required', 'string', 'max:10'],
        ]);*/
        $wallet = $request->isMethod('put') ? Wallet::findOrFail($request->wallet_id) : new Wallet;

        $wallet->name = $request->input('name');
        $wallet->email = $request->input('email');
        $pass = Hash::make($request->password);
        $wallet->password = $pass;
        $wallet->role = $request->input('role');

        if($wallet->save()) {
            return new walletsResource($wallet);
        }

    }

    public function destroy($id)
    {
        $wallet = Wallet::findOrFail($id);

        if($wallet->delete()) {
            return new walletsResource($wallet);
        }    
    }
}
