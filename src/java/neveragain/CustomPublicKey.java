package neveragain;

import java.math.BigInteger;
import javax.crypto.spec.DHParameterSpec;
import javax.crypto.interfaces.DHPublicKey;

import org.bouncycastle.jce.provider.JCEElGamalPublicKey;
import org.bouncycastle.jce.spec.ElGamalPublicKeySpec;
import org.bouncycastle.jce.spec.ElGamalParameterSpec;
import org.bouncycastle.jce.interfaces.ElGamalPublicKey;

public class CustomPublicKey implements ElGamalPublicKey, DHPublicKey {
	private BigInteger y;
	private ElGamalParameterSpec elSpec;

	public CustomPublicKey(ElGamalPublicKeySpec spec) {
    this.y = spec.getY();
    this.elSpec = new ElGamalParameterSpec(spec.getParams().getP(), spec.getParams().getG());
  }
  public String getAlgorithm() {
      return "ElGamal";
  }

  public String getFormat() {
      return "X.509";
  }

  public byte[] getEncoded() {
      return new byte[1];
  }

  public ElGamalParameterSpec getParameters() {
      return elSpec;
  }
  
  public DHParameterSpec getParams() {
      return new DHParameterSpec(elSpec.getP(), elSpec.getG());
  }

  public BigInteger getY() {
      return y;
  }
}
